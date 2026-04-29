"""
Aurea Materna – FastAPI Backend (WiFi Edition)
=============================================
Receives JSON sensor data from ESP32 via HTTP POST over WiFi.
Runs the ML risk predictor and exposes REST + SSE endpoints.

Sensor sources:
  ESP32 (WiFi)  → ecg, temp, ax, bpm  (POST /data/ingest)
  Simulated     → spo2, bp_sys, bp_dia (generated in backend)

Endpoints:
  POST /data/ingest   → ESP32 posts JSON here
  GET  /              → health check
  GET  /data/latest   → latest sensor snapshot + prediction
  GET  /data/history  → last N readings
  GET  /stream        → Server-Sent Events (SSE) live push at ~10 Hz
"""

import json
import math
import random
import threading
import time
import asyncio
from collections import deque
from typing import List, Optional

from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model import RiskPredictor
from rag import query_rag

# ── config ────────────────────────────────────────────────────────
HISTORY_LEN   = 200      # rolling history kept in RAM
DEMO_TIMEOUT  = 3.0      # seconds without ESP32 data → switch to demo

# ── app ───────────────────────────────────────────────────────────
app = FastAPI(title="Aurea Materna API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── shared state ──────────────────────────────────────────────────
predictor  = RiskPredictor()
history    = deque(maxlen=HISTORY_LEN)
latest     = {}
state_lock = threading.Lock()

last_esp32_time = 0.0    # epoch seconds of last real POST from ESP32

# ── SpO2 / BP simulation (always on backend) ──────────────────────
_spo2   = 98.0
_bp_sys = 110.0
_bp_dia = 72.0

def simulate_spo2_bp() -> tuple[float, int, int]:
    """
    Return (spo2, bp_systolic, bp_diastolic) with realistic slow drift.
    Normal maternal ranges:
      SpO2      : 95 – 100 %
      Systolic  : 90 – 120 mmHg
      Diastolic : 60 –  80 mmHg
    """
    global _spo2, _bp_sys, _bp_dia
    _spo2   = round(max(94.0, min(100.0, _spo2   + random.gauss(0, 0.15))), 1)
    _bp_sys = round(max(88.0, min(125.0, _bp_sys + random.gauss(0, 0.4))),  1)
    _bp_dia = round(max(58.0, min(82.0,  _bp_dia + random.gauss(0, 0.3))),  1)
    return _spo2, int(_bp_sys), int(_bp_dia)


# ── shared record builder ──────────────────────────────────────────
def build_and_store(raw: dict, demo: bool):
    """Run ML prediction, attach SpO2/BP sim, persist to history."""
    spo2, bp_sys, bp_dia = simulate_spo2_bp()

    prediction = predictor.update(
        ecg    = int(raw.get("ecg",  0)),
        temp   = float(raw.get("temp", 0.0)),
        ax     = int(raw.get("ax",   0)),
        bpm    = int(raw.get("bpm",  0)),
        spo2   = spo2,
        bp_sys = bp_sys,
        bp_dia = bp_dia,
    )

    record = {
        "timestamp": time.time(),
        "ecg":       raw.get("ecg",  0),
        "temp":      raw.get("temp", 0.0),
        "ax":        raw.get("ax",   0),
        "bpm":       raw.get("bpm",  0),
        "spo2":      spo2,
        "bp_sys":    bp_sys,
        "bp_dia":    bp_dia,
        "prediction": prediction,
        "demo_mode":  demo,
    }

    with state_lock:
        history.append(record)
        latest.update(record)
        
    return prediction


# ── demo data generator ───────────────────────────────────────────
_demo_t = 0.0

def demo_reading() -> dict:
    global _demo_t
    _demo_t += 0.1
    return {
        "ecg":  int(2048 + 1500 * math.sin(_demo_t * 2) + random.gauss(0, 80)),
        "temp": round(36.8 + 0.5 * math.sin(_demo_t * 0.05) + random.gauss(0, 0.05), 2),
        "ax":   int(random.gauss(0, 300)),
        "bpm":  int(72 + 10 * math.sin(_demo_t * 0.02) + random.gauss(0, 2)),
    }


# ── demo background thread ────────────────────────────────────────
def demo_runner():
    """
    Generates synthetic data when no real ESP32 POST arrives
    for more than DEMO_TIMEOUT seconds.
    """
    while True:
        time.sleep(0.1)
        elapsed = time.time() - last_esp32_time
        if elapsed > DEMO_TIMEOUT:
            build_and_store(demo_reading(), demo=True)

demo_thread = threading.Thread(target=demo_runner, daemon=True)
demo_thread.start()


# ════════════════════════════════════════════════════════════════════
#  ESP32 POST ENDPOINT
# ════════════════════════════════════════════════════════════════════
@app.post("/data/ingest")
async def ingest(request: Request):
    """
    Called by the ESP32 every 100 ms over WiFi.
    Body: {"ecg":<int>, "temp":<float>, "ax":<int>, "bpm":<int>}
    """
    global last_esp32_time

    try:
        raw = await request.json()
        if raw is None:
            raise ValueError("No JSON payload")
    except Exception:
        return JSONResponse(status_code=400, content={"error": "Invalid JSON"})

    last_esp32_time = time.time()
    prediction = build_and_store(raw, demo=False)

    return {"status": "ok", "ts": last_esp32_time, "risk_label": prediction["label"]}


# ── SSE Broadcaster ───────────────────────────────────────────────
async def generate_events():
    """Generator for Server-Sent Events (SSE)."""
    last_yielded = None
    while True:
        with state_lock:
            data = dict(latest)
            
        if data and data.get("timestamp") != last_yielded:
            last_yielded = data.get("timestamp")
            yield f"data: {json.dumps(data)}\n\n"
            
        await asyncio.sleep(0.05)  # Poll for updates at ~20Hz

@app.get("/stream")
async def stream():
    """Server-Sent Events endpoint to push live updates to the frontend."""
    return StreamingResponse(generate_events(), media_type="text/event-stream")


# ── REST endpoints ────────────────────────────────────────────────
@app.get("/")
async def root():
    elapsed = time.time() - last_esp32_time if last_esp32_time else 999
    return {
        "service":    "Aurea Materna API",
        "version":    "2.0.0 (FastAPI)",
        "esp32_live": elapsed < DEMO_TIMEOUT,
        "demo_mode":  elapsed >= DEMO_TIMEOUT,
    }


@app.get("/data/latest")
async def get_latest():
    with state_lock:
        return dict(latest) if latest else {"message": "No data yet"}


@app.get("/data/history")
async def get_history(n: int = Query(100, description="Number of records to fetch")):
    with state_lock:
        records = list(history)
    return records[-n:]

# ── Chatbot RAG endpoint ──────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    """
    RAG-based AI assistant endpoint.
    Retrieves context from maternal health knowledge base and generates an answer.
    """
    result = query_rag(req.message)
    return {
        "reply": result["answer"],
        "source": result["source_title"],
        "confidence": result["confidence"]
    }



if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI app on port 8000
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
