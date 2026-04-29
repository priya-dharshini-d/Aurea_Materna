"""
train_model.py
==============
Generates synthetic maternal sensor data and trains a
RandomForestClassifier that is saved as risk_model.pkl.

Features (12):
  ecg_mean, ecg_std, ecg_min, ecg_max,
  temp_mean,
  ax_mean, ax_std, ax_abs_max,
  bpm_mean,
  spo2_mean,
  bp_sys_mean, bp_dia_mean

Run once before starting app.py:
    python train_model.py
"""

import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

np.random.seed(42)
N = 3000   # samples per class

def make_normal(n):
    return np.column_stack([
        np.random.uniform(1800, 2400, n),   # ecg_mean
        np.random.uniform(50,   150,  n),   # ecg_std
        np.random.uniform(1500, 1900, n),   # ecg_min
        np.random.uniform(2500, 2900, n),   # ecg_max
        np.random.uniform(36.2, 37.5, n),   # temp_mean
        np.random.uniform(-200, 200,  n),   # ax_mean
        np.random.uniform(100,  400,  n),   # ax_std
        np.random.uniform(500, 5000,  n),   # ax_abs_max
        np.random.uniform(60,   100,  n),   # bpm_mean
        np.random.uniform(97,   100,  n),   # spo2_mean  ← NORMAL 97–100 %
        np.random.uniform(90,   120,  n),   # bp_sys_mean ← NORMAL 90–120
        np.random.uniform(60,    80,  n),   # bp_dia_mean ← NORMAL 60–80
    ])

def make_moderate(n):
    return np.column_stack([
        np.random.uniform(1500, 3000, n),
        np.random.uniform(200,  600,  n),
        np.random.uniform(1000, 1700, n),
        np.random.uniform(2800, 3500, n),
        np.random.uniform(37.8, 38.8, n),
        np.random.uniform(-500, 500,  n),
        np.random.uniform(400,  900,  n),
        np.random.uniform(8000,14000, n),
        np.random.uniform(55,   115,  n),
        np.random.uniform(94,    97,  n),   # spo2 mildly low
        np.random.uniform(120,  140,  n),   # bp_sys elevated
        np.random.uniform(78,    90,  n),   # bp_dia elevated
    ])

def make_high(n):
    return np.column_stack([
        np.random.uniform(500,  4000, n),
        np.random.uniform(600, 1200,  n),
        np.random.uniform(200,  900,  n),
        np.random.uniform(3200, 4095, n),
        np.random.uniform(38.8, 41.0, n),
        np.random.uniform(-1000,1000, n),
        np.random.uniform(900, 2000,  n),
        np.random.uniform(15000,32000,n),
        np.random.uniform(30,   55,   n),
        np.random.uniform(88,    94,  n),   # spo2 critically low
        np.random.uniform(140,  180,  n),   # bp_sys hypertensive
        np.random.uniform(90,   110,  n),   # bp_dia hypertensive
    ])

X = np.vstack([make_normal(N), make_moderate(N), make_high(N)])
y = np.array([0]*N + [1]*N + [2]*N)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.2, random_state=42)

clf = RandomForestClassifier(n_estimators=150, max_depth=10, random_state=42, n_jobs=-1)
clf.fit(X_train, y_train)

print(classification_report(y_test, clf.predict(X_test),
      target_names=["Normal","Moderate Risk","High Risk"]))

joblib.dump(clf, "risk_model.pkl")
print("\n✅ Model saved → risk_model.pkl")
