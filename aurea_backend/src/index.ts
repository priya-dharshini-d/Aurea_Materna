import express from 'express';
import cors from 'cors';
import { motherData, ashaData, doctorData, adminData } from './data';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mother endpoints
app.get('/api/mother', (req, res) => {
  res.json(motherData);
});

// ASHA endpoints
app.get('/api/asha', (req, res) => {
  res.json(ashaData);
});

// Doctor endpoints
app.get('/api/doctor', (req, res) => {
  res.json(doctorData);
});

// Admin endpoints
app.get('/api/admin', (req, res) => {
  res.json(adminData);
});

// Start server
app.listen(PORT, () => {
  console.log(`AUREA backend server running on http://localhost:${PORT}`);
});
const newMother = req.body;
if (!newMother.name) {
  return res.status(400).json({ error: 'Mother name is required' });
}

// Add to the list
ashaData.mothers = [newMother, ...ashaData.mothers];
ashaData.totalMothers += 1;

// Sync with doctor patient list (since they share the same array in mock)
doctorData.patients = ashaData.mothers;

console.log(`New mother registered: ${newMother.name}`);
res.status(201).json(newMother);
});

// Update vitals (Mother)
app.post('/api/mother/vitals', (req, res) => {
  const { hr, bp, spo2, temp } = req.body;

  motherData.vitals = {
    hr: hr || motherData.vitals.hr,
    bp: bp || motherData.vitals.bp,
    spo2: spo2 || motherData.vitals.spo2,
    temp: temp || motherData.vitals.temp
  };

  console.log(`Vitals updated for Priya K.`);
  res.json(motherData.vitals);
});

// Trigger SOS
app.post('/api/sos', (req, res) => {
  const { location, reason } = req.body;

  const alert = {
    id: Date.now(),
    level: 'red',
    title: `URGENT: SOS from Priya K.`,
    subtitle: `${reason || 'Emergency button pressed'} · ${location || 'Current location'}`,
    read: false
  };

  // Add alert to ASHA list
  ashaData.alerts = [alert, ...ashaData.alerts];

  console.log(`SOS Alert Triggered: ${reason}`);
  res.status(201).json({ message: 'SOS alert sent successfully', alert });
});

// Start server
app.listen(PORT, () => {
  console.log(`AUREA backend server running on http://localhost:${PORT}`);
});
