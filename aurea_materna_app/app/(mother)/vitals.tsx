import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';
import { motherData } from '../../constants/MockData';
import WaveformChart from '../../components/WaveformChart';

const screenWidth = Dimensions.get('window').width - 64;

export default function MotherVitals() {
  const [sensorData, setSensorData] = useState<any>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('http://localhost:8000/data/latest');
        const data = await res.json();
        if (data && data.timestamp) {
          setSensorData(data);
        }
      } catch (err) {}
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 1000);
    return () => clearInterval(interval);
  }, []);

  const hr = sensorData?.bpm ?? motherData.vitals.hr;
  const ecg = sensorData?.ecg ?? 0;
  const spo2 = sensorData?.spo2 ?? motherData.vitals.spo2;
  const temp = sensorData?.temp ?? motherData.vitals.temp;

  const riskLevel = sensorData?.prediction?.risk_level ?? 0;
  const riskLabel = sensorData?.prediction?.label ?? 'Normal';
  const riskColor = riskLevel === 0 ? Colors.success : riskLevel === 1 ? Colors.warning : Colors.danger;
  const riskBg = riskLevel === 0 ? Colors.successLight : riskLevel === 1 ? Colors.warningLight : Colors.dangerLight;
  const pprsScore = sensorData?.prediction?.score ?? 82;

  const hrStatus = hr > 100 || hr < 60 ? 'Abnormal' : 'Normal';
  const hrColor = hrStatus === 'Normal' ? Colors.success : Colors.danger;

  const ecgStatus = ecg > 4000 || ecg < 0 ? 'Abnormal' : 'Normal';
  const ecgColor = ecgStatus === 'Normal' ? Colors.success : Colors.danger;

  const spo2Status = spo2 < 95 ? 'Low' : 'Excellent';
  const spo2Color = spo2Status === 'Low' ? Colors.danger : Colors.primary;

  const tempStatus = temp > 37.5 ? 'High' : 'Normal';
  const tempColor = tempStatus === 'Normal' ? Colors.success : Colors.danger;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Vitals Detail</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Live Readings</Text>
          <VitalRow label="Heart Rate" value={String(hr)} unit="bpm" range="60-100" progress={hr > 100 ? 90 : hr < 60 ? 10 : 60} color={hrColor} status={hrStatus} />
          <VitalRow label="ECG Value" value={String(ecg)} unit="mV" range="0-4095" progress={(ecg/4095)*100 || 50} color={ecgColor} status={ecgStatus} />
          <VitalRow label="SpO₂" value={String(spo2)} unit="%" range="above 95%" progress={spo2} color={spo2Color} status={spo2Status} />
          <VitalRow label="Body Temp" value={String(temp)} unit="°C" range="36.1-37.2" progress={50} color={tempColor} status={tempStatus} isLast />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Uterine Activity</Text>
            <View style={styles.chipGreen}>
              <Text style={styles.chipGreenText}>Low</Text>
            </View>
          </View>
          <WaveformChart />
          <Text style={styles.caption}>Abdominal EMG · 2 contractions in last hour</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Placental Perfusion Index</Text>
          <View style={styles.row}>
            <View style={[styles.scoreCircle, { borderColor: riskColor, backgroundColor: riskBg }]}>
              <Text style={[styles.scoreText, { color: riskColor }]}>{pprsScore}</Text>
              <Text style={[styles.scoreLabel, { color: riskColor }]}>PPRS</Text>
            </View>
            <View style={styles.textCol}>
              <Text style={styles.desc}>Near-infrared spectroscopy via patch. Placental oxygen delivery is adequate.</Text>
              <View style={styles.chipsRow}>
                <Text style={styles.chip}>PlGF ✓</Text>
                <Text style={styles.chip}>uPI ✓</Text>
                <Text style={styles.chip}>RI ✓</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fetal Movement (Today)</Text>
          <BarChart
            data={{
              labels: ['8a', '10a', '12p', '2p', '4p', '6p'],
              datasets: [{ data: [2, 1, 3, 0, 4, 2] }]
            }}
            width={screenWidth}
            height={160}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(24, 95, 165, ${opacity})`,
              barPercentage: 0.6,
              fillShadowGradient: Colors.primary, fillShadowGradientOpacity: 1,
            }}
            withInnerLines={false}
            style={styles.chart}
          />
          <View style={styles.summaryRow}>
            <Text style={styles.desc}>12 movements today</Text>
            <Text style={styles.chip}>Active ✓</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>24-Hour Trend</Text>
          <LineChart
            data={{
              labels: ['12a', '4a', '8a', '12p', '4p', '8p'],
              datasets: [
                { data: [78, 80, 84, 88, 86, 82], color: (opacity = 1) => Colors.primary },
                { data: [98, 97, 98, 99, 98, 98], color: (opacity = 1) => Colors.teal }
              ],
              legend: ['HR (bpm)', 'SpO₂ (%)']
            }}
            width={screenWidth}
            height={180}
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
              propsForDots: { r: '3' }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>AI running on-device</Text>
          <Text style={styles.aiText}>Personalised baseline established over 14 days. No cloud needed for risk prediction.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function VitalRow({ label, value, unit, range, progress, color, isLast, status = "Normal" }: any) {
  return (
    <View style={[styles.vitalItem, !isLast && styles.borderBottom]}>
      <View style={styles.vitalHeader}>
        <Text style={styles.vitalLabel}>{label}</Text>
        <Text style={[styles.vitalStatus, color === Colors.danger ? {color: Colors.danger, backgroundColor: Colors.dangerLight} : {}]}>{status}</Text>
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.vitalValue}>{value}</Text>
        <Text style={styles.vitalUnit}>{unit}</Text>
      </View>
      <View style={styles.progBg}>
        <View style={[styles.progFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.vitalRange}>Range: {range}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingTop: 4, paddingBottom: 40 },
  header: { 
    paddingTop: 16,
    paddingBottom: 24
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A4D6E',
    lineHeight: 32
  },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  vitalItem: { paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  vitalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  vitalLabel: { fontSize: 12, color: Colors.textMuted },
  vitalStatus: { fontSize: 11, color: Colors.success, fontWeight: '600', backgroundColor: Colors.successLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  vitalValue: { fontSize: 32, fontWeight: '700', color: Colors.textPrimary },
  vitalUnit: { fontSize: 14, color: Colors.textMuted, marginLeft: 4 },
  progBg: { height: 8, backgroundColor: Colors.bg, borderRadius: 4, marginBottom: 6 },
  progFill: { height: 8, borderRadius: 4 },
  vitalRange: { fontSize: 11, color: Colors.textMuted },
  row: { flexDirection: 'row', alignItems: 'center' },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: Colors.success, backgroundColor: Colors.successLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  scoreText: { fontSize: 28, fontWeight: '700', color: Colors.success },
  scoreLabel: { fontSize: 10, color: Colors.success, fontWeight: '600' },
  textCol: { flex: 1 },
  desc: { fontSize: 13, color: Colors.textMuted, lineHeight: 18 },
  chipsRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  chip: { fontSize: 10, color: Colors.success, backgroundColor: Colors.successLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, fontWeight: '600' },
  chart: { marginVertical: 8, borderRadius: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  aiCard: { backgroundColor: Colors.primaryLight, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(24, 95, 165, 0.2)' },
  aiTitle: { fontSize: 14, fontWeight: '600', color: Colors.primary, marginBottom: 6 },
  aiText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 18 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  chipGreen: { backgroundColor: Colors.successLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  chipGreenText: { color: Colors.success, fontSize: 12, fontWeight: '600' },
  caption: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginTop: 12 },
});
