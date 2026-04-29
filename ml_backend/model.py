"""
Aurea Materna – ML Model
========================
Analyses streaming maternal sensor data and predicts risk level.

Features used per window (11 total):
  ecg_mean, ecg_std, ecg_min, ecg_max,
  temp_mean,
  ax_mean, ax_std, ax_abs_max,
  bpm_mean,
  spo2_mean,
  bp_sys_mean, bp_dia_mean

Output classes:
  0 → Normal
  1 → Moderate Risk
  2 → High Risk
"""

import numpy as np
from collections import deque
import joblib
import os

# ── window ────────────────────────────────────────────────────────
WINDOW_SIZE = 50   # number of samples per inference window

# ── label map ─────────────────────────────────────────────────────
RISK_LABELS = {
    0: "Normal",
    1: "Moderate Risk",
    2: "High Risk",
}

RISK_COLORS = {
    "Normal":        "#22c55e",   # green
    "Moderate Risk": "#f59e0b",   # amber
    "High Risk":     "#ef4444",   # red
}


class SensorWindow:
    """Rolling buffer that holds the last WINDOW_SIZE samples."""

    def __init__(self, maxlen: int = WINDOW_SIZE):
        self.ecg    = deque(maxlen=maxlen)
        self.temp   = deque(maxlen=maxlen)
        self.ax     = deque(maxlen=maxlen)
        self.bpm    = deque(maxlen=maxlen)
        self.spo2   = deque(maxlen=maxlen)
        self.bp_sys = deque(maxlen=maxlen)
        self.bp_dia = deque(maxlen=maxlen)
        self.maxlen = maxlen

    def add(self, ecg: int, temp: float, ax: int, bpm: int,
            spo2: float, bp_sys: int, bp_dia: int):
        self.ecg.append(ecg)
        self.temp.append(temp)
        self.ax.append(ax)
        self.bpm.append(bpm)
        self.spo2.append(spo2)
        self.bp_sys.append(bp_sys)
        self.bp_dia.append(bp_dia)

    def is_ready(self) -> bool:
        return len(self.ecg) >= self.maxlen

    def extract_features(self) -> np.ndarray:
        ecg_arr    = np.array(self.ecg,    dtype=float)
        temp_arr   = np.array(self.temp,   dtype=float)
        ax_arr     = np.array(self.ax,     dtype=float)
        bpm_arr    = np.array(self.bpm,    dtype=float)
        spo2_arr   = np.array(self.spo2,   dtype=float)
        bpsys_arr  = np.array(self.bp_sys, dtype=float)
        bpdia_arr  = np.array(self.bp_dia, dtype=float)

        features = np.array([
            ecg_arr.mean(),
            ecg_arr.std(),
            ecg_arr.min(),
            ecg_arr.max(),
            temp_arr.mean(),
            ax_arr.mean(),
            ax_arr.std(),
            np.abs(ax_arr).max(),
            bpm_arr.mean(),
            spo2_arr.mean(),
            bpsys_arr.mean(),
            bpdia_arr.mean(),
        ])
        return features.reshape(1, -1)


# ── model loader ──────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "risk_model.pkl")


def load_or_create_model():
    """
    Load a pre-trained sklearn model if available,
    otherwise fall back to a simple rule-based classifier.
    """
    if os.path.exists(MODEL_PATH):
        print("[Model] Loading pre-trained model from", MODEL_PATH)
        return joblib.load(MODEL_PATH)
    else:
        print("[Model] No saved model found – using rule-based fallback.")
        return None


# ── rule-based fallback ───────────────────────────────────────────
def rule_based_predict(features: np.ndarray) -> tuple[int, int]:
    """
    Simple threshold rules when no trained model is available.
    Returns (risk_level, continuous_score).
    """
    temp    = features[0, 4]
    bpm     = features[0, 8]
    ax_max  = features[0, 7]
    ecg_std = features[0, 1]
    spo2    = features[0, 9]
    bp_sys  = features[0, 10]
    bp_dia  = features[0, 11]

    penalty = 0

    if temp > 39.0: penalty += 2
    elif temp > 38.0: penalty += 1

    if bpm > 120 or bpm < 50: penalty += 2
    elif bpm > 100 or bpm < 60: penalty += 1

    if ax_max > 18000: penalty += 2
    elif ax_max > 12000: penalty += 1

    if ecg_std > 800: penalty += 1

    if spo2 < 94.0: penalty += 2
    elif spo2 < 96.0: penalty += 1

    if bp_sys > 140 or bp_dia > 90: penalty += 2
    elif bp_sys > 130 or bp_dia > 85: penalty += 1

    if penalty >= 4:
        risk_level = 2
    elif penalty >= 2:
        risk_level = 1
    else:
        risk_level = 0

    # Calculate a continuous health score (0-100) based on variance from ideals
    score = 100.0
    score -= abs(temp - 37.0) * 5
    if bpm > 80: score -= (bpm - 80) * 0.5
    elif bpm < 70: score -= (70 - bpm) * 0.5
    score -= (100 - spo2) * 2
    score -= max(0, bp_sys - 120) * 0.5
    score -= max(0, bp_dia - 80) * 0.5

    continuous_score = int(max(10, min(100, score)))

    return risk_level, continuous_score


# ── main predictor class ───────────────────────────────────────────
class RiskPredictor:
    def __init__(self):
        self.window = SensorWindow()
        self.model  = load_or_create_model()
        self.last_prediction = {"label": "Normal", "risk_level": 0, "color": "#22c55e", "score": 82}

    def update(self, ecg: int, temp: float, ax: int, bpm: int,
               spo2: float = 98.0, bp_sys: int = 110, bp_dia: int = 72) -> dict:
        self.window.add(ecg, temp, ax, bpm, spo2, bp_sys, bp_dia)

        if not self.window.is_ready():
            return self.last_prediction

        features = self.window.extract_features()

        if self.model is not None:
            risk_level = int(self.model.predict(features)[0])
            if hasattr(self.model, "predict_proba"):
                probs = self.model.predict_proba(features)[0]
                expected_risk = sum(i * p for i, p in enumerate(probs))
                continuous_score = int(max(10, 100 - (expected_risk / 2.0) * 100))
            else:
                continuous_score = 82 if risk_level == 0 else 50 if risk_level == 1 else 20
        else:
            risk_level, continuous_score = rule_based_predict(features)

        label = RISK_LABELS.get(risk_level, "Unknown")
        self.last_prediction = {
            "label":      label,
            "risk_level": risk_level,
            "color":      RISK_COLORS.get(label, "#ffffff"),
            "score":      continuous_score
        }
        return self.last_prediction
