export function calculatePPRS(hr: number, systolic: number, diastolic: number, spo2: number, temp: number) {
  const hrScore = hr >= 60 && hr <= 100 ? 25 : hr < 60 ? 15 : 10;
  const bpScore = systolic < 120 ? 35 : systolic < 130 ? 28 : systolic < 140 ? 18 : 5;
  const spo2Score = spo2 >= 97 ? 25 : spo2 >= 95 ? 20 : spo2 >= 92 ? 12 : 5;
  const tempScore = temp >= 36.1 && temp <= 37.2 ? 15 : 8;
  let total = hrScore + bpScore + spo2Score + tempScore;
  let status = total >= 70 ? 'green' : total >= 40 ? 'amber' : 'red';
  if (systolic > 140 || spo2 < 94) {
    status = 'red';
  }
  return { score: total, status };
}
