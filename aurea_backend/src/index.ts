import express from 'express';
import cors from 'cors';
import { motherData, ashaData, doctorData, adminData } from './data.js';

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
