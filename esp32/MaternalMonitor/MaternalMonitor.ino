/*
 * ================================================================
 *  Aurea Materna – ESP32 Maternal Monitor (WiFi Edition)
 *  Sends JSON sensor data via HTTP POST over WiFi to FastAPI.
 *
 *  ▶ CONFIGURE THESE 3 LINES BEFORE UPLOADING:
 *      WIFI_SSID   – your WiFi network name
 *      WIFI_PASS   – your WiFi password
 *      SERVER_IP   – PC's local IP (run `ipconfig` on Windows)
 *
 *  POST  http://<SERVER_IP>:8000/data/ingest
 *  Body: {"ecg":<int>,"temp":<float>,"ax":<int>,"bpm":<int>}
 * ================================================================
 */

#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ================================================================
//  ▶▶  EDIT THESE THREE LINES  ◀◀
// ================================================================
const char* WIFI_SSID  = "Pixel crDroid";
const char* WIFI_PASS  = "hamvish200";
const char* SERVER_IP  = "192.168.196.168";   // PC's local IP address on Pixel Hotspot
// ================================================================

#define SERVER_PORT  8000
#define INGEST_PATH  "/data/ingest"

// ---------------- OLED ----------------
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ---------------- PIN DEFINITIONS ----------------
#define ECG_PIN       34
#define LO_PLUS       35
#define LO_MINUS      32
#define MOTOR_PIN     2
#define SDA_PIN       21
#define SCL_PIN       22
#define ONE_WIRE_BUS  4
#define STATUS_LED_PIN 13 // LED pin for showing Normal status

// ---------------- DS18B20 ----------------
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// ---------------- MPU6050 ----------------
#define MPU_ADDR 0x68

// ---------------- STATE VARIABLES ----------------
float         lastTemp      = 0.0;
unsigned long lastTempTime  = 0;

int           ecgGraph[SCREEN_WIDTH];
int           graphIndex    = 0;

int           threshold     = 2200;
bool          peakDetected  = false;
unsigned long lastBeatTime  = 0;
int           bpm           = 0;

unsigned long lastPostTime  = 0;
#define POST_INTERVAL 100          // send HTTP POST every 100 ms (10 Hz)

bool          wifiOK        = false;

// ================================================================
//  WiFi CONNECTION
// ================================================================
void connectWiFi() {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Connecting WiFi...");
  display.println(WIFI_SSID);
  display.display();

  Serial.printf("[WiFi] Connecting to %s", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiOK = true;
    Serial.printf("\n[WiFi] Connected! IP: %s\n", WiFi.localIP().toString().c_str());

    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Connected!");
    display.print("IP: ");
    display.println(WiFi.localIP().toString());
    display.print("Server: ");
    display.println(SERVER_IP);
    display.display();
    delay(2000);
  } else {
    wifiOK = false;
    Serial.println("\n[WiFi] FAILED – running without network.");
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi FAILED");
    display.println("Check credentials");
    display.display();
    delay(2000);
  }
}

// ================================================================
//  SETUP
// ================================================================
void setup() {
  Serial.begin(115200);

  pinMode(LO_PLUS,   INPUT);
  pinMode(LO_MINUS,  INPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);

  Wire.begin(SDA_PIN, SCL_PIN);
  Wire.setClock(100000);

  // OLED init
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("[OLED] Init failed");
    while (1);
  }
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Aurea Materna");
  display.println("Starting up...");
  display.display();

  // DS18B20
  sensors.begin();

  // MPU6050 wake-up
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B);
  Wire.write(0x00);
  Wire.endTransmission();

  delay(300);

  // Connect WiFi
  connectWiFi();

  display.clearDisplay();
}

// ================================================================
//  SENSOR HELPERS
// ================================================================
int readECG() {
  if (digitalRead(LO_PLUS) || digitalRead(LO_MINUS)) return 0;
  return analogRead(ECG_PIN);
}

float readTemperature() {
  if (millis() - lastTempTime > 1000) {
    lastTempTime = millis();
    sensors.requestTemperatures();
    float t = sensors.getTempCByIndex(0);
    if (t != DEVICE_DISCONNECTED_C) {
      lastTemp = t;
      if (t > 38.0) vibrate(300);
    }
  }
  return lastTemp;
}

int16_t readAccelX() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);
  if (Wire.endTransmission(false) != 0) return 0;

  Wire.requestFrom(MPU_ADDR, 6);
  if (Wire.available() < 6) return 0;

  int16_t ax = (Wire.read() << 8) | Wire.read();
  Wire.read(); Wire.read();
  Wire.read(); Wire.read();

  if (abs(ax) > 20000) vibrate(500);
  return ax;
}

void vibrate(int duration) {
  digitalWrite(MOTOR_PIN, HIGH);
  delay(duration);
  digitalWrite(MOTOR_PIN, LOW);
}

// ================================================================
//  BPM CALCULATION
// ================================================================
void updateBPM(int ecg) {
  if (ecg > threshold && !peakDetected) {
    peakDetected = true;
    unsigned long now      = millis();
    unsigned long interval = now - lastBeatTime;
    if (interval > 300 && interval < 2000) {
      bpm = 60000 / interval;
    }
    lastBeatTime = now;
  }
  if (ecg < threshold - 100) peakDetected = false;
}

// ================================================================
//  OLED DRAW
//  Shows: BPM | Temp | WiFi status | ECG waveform
// ================================================================
void drawDisplay(int ecgValue, float temp) {
  int y = map(ecgValue, 0, 4095, SCREEN_HEIGHT - 1, 20);
  ecgGraph[graphIndex] = y;
  graphIndex = (graphIndex + 1) % SCREEN_WIDTH;

  display.clearDisplay();

  // Row 1: BPM + Temp
  display.setCursor(0, 0);
  display.print("BPM:");
  display.print(bpm);
  display.setCursor(70, 0);
  display.print("T:");
  display.print(temp, 1);
  display.print("C");



  // ECG waveform (rows 20–63)
  for (int i = 1; i < SCREEN_WIDTH; i++) {
    int y1 = ecgGraph[(graphIndex + i - 1) % SCREEN_WIDTH];
    int y2 = ecgGraph[(graphIndex + i)     % SCREEN_WIDTH];
    display.drawLine(i - 1, y1, i, y2, WHITE);
  }

  display.display();
}

// ================================================================
//  SEND DATA VIA HTTP POST (WiFi)
// ================================================================
void postData(int ecg, float temp, int16_t ax) {
  // Reconnect WiFi if dropped
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[WiFi] Reconnecting…");
    WiFi.reconnect();
    delay(200);
    if (WiFi.status() != WL_CONNECTED) return;   // skip this cycle
  }

  // Build server URL
  String url = "http://";
  url += SERVER_IP;
  url += ":";
  url += SERVER_PORT;
  url += INGEST_PATH;

  // Build JSON payload
  String payload = "{\"ecg\":";
  payload += ecg;
  payload += ",\"temp\":";
  payload += String(temp, 2);
  payload += ",\"ax\":";
  payload += ax;
  payload += ",\"bpm\":";
  payload += bpm;
  payload += "}";

  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(500);          // 1000 ms max to prevent read timeout over hotspot

  int code = http.POST(payload);

  if (code > 0) {
    String response = http.getString();
    Serial.printf("[POST] %d  %s\n", code, payload.c_str());
    if (response.indexOf("\"risk_label\":\"Normal\"") != -1 || response.indexOf("\"risk_label\": \"Normal\"") != -1) {
      digitalWrite(STATUS_LED_PIN, HIGH);
    } else {
      digitalWrite(STATUS_LED_PIN, LOW);
    }
  } else {
    Serial.printf("[POST] Error: %s\n", http.errorToString(code).c_str());
    digitalWrite(STATUS_LED_PIN, LOW);
  }

  http.end();
}

// ================================================================
//  LOOP
// ================================================================
void loop() {
  int     ecg  = readECG();
  float   temp = readTemperature();
  int16_t ax   = readAccelX();

  updateBPM(ecg);
  drawDisplay(ecg, temp);

  // POST to backend at fixed rate
  if (millis() - lastPostTime >= POST_INTERVAL) {
    lastPostTime = millis();
    if (wifiOK) {
      postData(ecg, temp, ax);
    } else {
      // Fallback: print to Serial if WiFi unavailable
      Serial.printf("{\"ecg\":%d,\"temp\":%.2f,\"ax\":%d,\"bpm\":%d}\n",
                    ecg, temp, ax, bpm);
    }
  }

  delay(10);
}
