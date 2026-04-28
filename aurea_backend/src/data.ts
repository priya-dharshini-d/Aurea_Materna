export const motherData = {
  name: "Priya K.",
  week: 24,
  pprs: 82,
  pprsStatus: "green",
  vitals: { hr: 84, bp: "118/76", spo2: 98, temp: 36.8 },
  fetalMovements: 12,
  contractions: 2,
  alerts: [
    { id: 1, level: 'green', title: 'All vitals normal', subtitle: 'Today 6:00 AM · Patch confirmed normal readings' },
    { id: 2, level: 'amber', title: 'Blood pressure slightly elevated', subtitle: 'Yesterday 2:30 PM · 132/88 mmHg detected' },
  ],
  tutorials: [
    { id: 1, thumb: "🤰", title: "Managing high blood pressure", format: "Video", duration: "4 min", language: "Tamil", rating: "4.9", progress: 75 },
    { id: 2, thumb: "🥗", title: "Iron-rich foods", format: "Audio", duration: "6 min", language: "Hindi", rating: "4.8", progress: 0 },
    { id: 3, thumb: "⚠️", title: "Warning signs", format: "Images", duration: "8 min", language: "Tamil", rating: "5.0", progress: 100 },
    { id: 4, thumb: "🧘", title: "Breathing exercises", format: "Video", duration: "10 min", language: "Telugu", rating: "4.7", progress: 30 },
    { id: 5, thumb: "🏥", title: "When to go to hospital", format: "Audio", duration: "5 min", language: "Tamil", rating: "5.0", progress: 0 },
    { id: 6, thumb: "👶", title: "Baby bonding techniques", format: "Video", duration: "7 min", language: "Tamil", rating: "4.9", progress: 0 },
  ],
  reports: [
    { id: 1, title: 'First Trimester Blood Test', date: '12 Jan 2026', doctor: 'Dr. Sarah Smith', status: 'Normal', icon: 'water' },
    { id: 2, title: 'Anatomy Scan Ultrasound', date: '28 Feb 2026', doctor: 'Dr. Alan Grant', status: 'Reviewing', icon: 'scan' },
    { id: 3, title: 'Glucose Screening Test', date: '15 Apr 2026', doctor: 'Dr. Sarah Smith', status: 'Pending', icon: 'flask' },
  ],
};

export const ashaData = {
  name: "Meena Devi",
  panchayat: "Karamadai",
  totalMothers: 18,
  greenCount: 14,
  amberCount: 3,
  redCount: 1,
  mothers: [
    { id: 1, initials: "LP", name: "Lakshmi P.", week: 32, pprs: 45, status: "red", bp: "148/94" },
    { id: 2, initials: "GS", name: "Gomathi S.", week: 28, pprs: 62, status: "amber", bp: "126/82" },
    { id: 3, initials: "DR", name: "Devi R.", week: 36, pprs: 67, status: "amber", bp: "122/80" },
    { id: 4, initials: "PK", name: "Priya K.", week: 24, pprs: 82, status: "green", bp: "118/76" },
  ],
  schedule: [
    { time: '9:00 AM', status: 'done', title: 'Priya K. — Routine check' },
    { time: '11:00 AM', status: 'current', title: 'Lakshmi P. — Urgent BP check' },
    { time: '2:00 PM', status: 'pending', title: 'Gomathi S. — Device re-pairing' },
  ],
  alerts: [
    { id: 1, level: 'red', title: 'Lakshmi P. — BP 148/94', subtitle: 'Week 32 · PPRS dropped to 45', read: false },
    { id: 2, level: 'amber', title: 'Gomathi S. — Missed medication', subtitle: 'Week 28 · Iron supplement skipped', read: false },
    { id: 3, level: 'green', title: 'Priya K. — Normal check complete', subtitle: 'All vitals within range', read: true },
  ],
};

export const doctorData = {
  name: "Dr. S. Ramesh",
  phc: "PHC Coimbatore",
  totalPatients: 47,
  redCount: 1,
  amberCount: 8,
  patients: ashaData.mothers,
  bpTrend7Day: [118, 120, 119, 122, 125, 121, 119],
};

export const adminData = {
  district: "Coimbatore",
  totalEnrolled: 1247,
  activeDevices: 1089,
  highRisk: 23,
  adherenceRate: 94,
  villages: [
    { name: "Karamadai", mothers: 18, status: "green" },
    { name: "Mettupalayam", mothers: 24, status: "amber" },
    { name: "Annur", mothers: 16, status: "red" },
    { name: "Thondamuthur", mothers: 21, status: "green" },
    { name: "Kinathukadavu", mothers: 12, status: "green" },
    { name: "Madukkarai", mothers: 29, status: "amber" },
    { name: "Sulur", mothers: 20, status: "green" },
    { name: "Sarcarsamakulam", mothers: 11, status: "amber" },
  ],
  devices: [
    { id: 'AM-2401', location: 'Karamadai', battery: 87, signal: 'strong', lastSync: '4m ago', status: 'Active' },
    { id: 'AM-2389', location: 'Annur', battery: 18, signal: 'weak', lastSync: '2h ago', status: 'Low bat.' },
  ],
  reports: [
    { name: 'April 2026 — District Summary', type: 'PDF', desc: '1,247 mothers · 3 outcomes' },
    { name: 'Q1 2026 — Outcome Analysis', type: 'XLSX', desc: 'Preterm prevention' },
  ],
  impactMetrics: {
    mortalityReduction: 62,
    pretermReduction: 38,
    responseTimeOld: 18,
    responseTimeNew: 4,
    costReduction: 44,
  }
};
