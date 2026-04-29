import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import RiskRing from '../../components/RiskRing';
import VitalCard from '../../components/VitalCard';
import { motherData } from '../../constants/MockData';

const quickAccessItems = [
  { id: 1, title: 'Diet Plan', icon: 'nutrition', color: '#4CAF50', bg: '#E8F5E9', route: '/(mother)/diet' },
  { id: 2, title: 'Exercise', icon: 'fitness', color: '#2196F3', bg: '#E3F2FD', route: '/(mother)/exercise' },
  { id: 3, title: 'Baby Growth', icon: 'happy', color: '#E91E63', bg: '#FCE4EC', route: '/(mother)/baby-growth' },
  { id: 4, title: 'Reports', icon: 'document-text', color: '#FF9800', bg: '#FFF3E0', route: '/(mother)/reports' },
  { id: 5, title: 'Tracker', icon: 'analytics', color: '#9C27B0', bg: '#F3E5F5', route: '/(mother)/tracker' },
  { id: 6, title: 'Reminders', icon: 'notifications', color: '#F44336', bg: '#FFEBEE', route: '/(mother)/reminders' },
];

export default function MotherHome() {
  const router = useRouter();
  const [sensorData, setSensorData] = useState<any>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('http://localhost:8000/data/latest');
        const data = await res.json();
        if (data && data.timestamp) {
          setSensorData(data);
        }
      } catch (err) {
        // console.warn("Failed to fetch sensor data:", err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 1000); // Poll every second
    return () => clearInterval(interval);
  }, []);

  // Compute values from sensorData or fallback to mock data
  const hr = sensorData?.bpm ?? motherData.vitals.hr;
  const ecg = sensorData?.ecg ?? 0;
  const spo2 = sensorData?.spo2 ?? motherData.vitals.spo2;
  const temp = sensorData?.temp ?? motherData.vitals.temp;

  // ML Analysis Result Mapping
  const riskLevel = sensorData?.prediction?.risk_level ?? 0;
  const riskStatusMap: Record<number, 'green' | 'amber' | 'red'> = {
    0: 'green',
    1: 'amber',
    2: 'red',
  };
  const riskStatus = riskStatusMap[riskLevel] || 'green';
  const pprsScore = sensorData?.prediction?.score ?? 82;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.greeting}>Home</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-seal" size={16} color="#0F6E56" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.profileBtn, { marginRight: 10 }]}
              onPress={() => router.push('/(mother)/notifications' as any)}
            >
              <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => router.push('/(mother)/profile' as any)}
            >
              <Ionicons name="person" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>



        {/* Risk Ring */}
        <RiskRing score={pprsScore} status={riskStatus} />

        {/* Vitals */}
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalRow}>
            <VitalCard icon="heart" value={String(hr)} unit="bpm" label="Heart Rate" />
            <VitalCard icon="pulse" value={String(ecg)} unit="mV" label="ECG Value" />
          </View>
          <View style={styles.vitalRow}>
            <VitalCard icon="pulse" value={String(spo2)} unit="%" label="Oxygen Saturation" />
            <VitalCard icon="thermometer" value={String(temp)} unit="°C" label="Temperature" />
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.quickAccessCard}
                activeOpacity={0.8}
                onPress={() => item.route && router.push(item.route as any)}
              >
                <View style={[styles.qaIconContainer, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon as any} size={32} color={item.color} />
                </View>
                <Text style={styles.qaTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming checkup */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming checkup</Text>
          <View style={styles.checkupRow}>
            <View style={styles.calendarIconBg}>
              <Ionicons name="calendar" size={24} color={Colors.primary} />
            </View>
            <View style={styles.checkupInfo}>
              <Text style={styles.checkupTitle}>Glucose tolerance test</Text>
              <Text style={styles.checkupSub}>In 4 days · PHC Coimbatore</Text>
              <TouchableOpacity style={styles.directionsBtn}>
                <Text style={styles.directionsBtnText}>Get directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDFA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 12, borderWidth: 1, borderColor: '#CCFBF1' },
  verifiedText: { color: '#0F766E', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  vitalsGrid: { marginBottom: 16 },
  vitalRow: { flexDirection: 'row', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 20 },
  quickAccessContainer: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickAccessCard: { width: '30%', alignItems: 'center', marginBottom: 16 },
  qaIconContainer: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  qaTitle: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center' },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 20 },
  checkupRow: { flexDirection: 'row', alignItems: 'flex-start' },
  calendarIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkupInfo: { flex: 1 },
  checkupTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  checkupSub: { fontSize: 13, color: Colors.textMuted, marginBottom: 10 },
  directionsBtn: { backgroundColor: Colors.primaryLight, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
  directionsBtnText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
});
