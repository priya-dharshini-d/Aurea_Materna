import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { fetchFromApi } from '../../constants/api';
import RiskRing from '../../components/RiskRing';
import VitalCard from '../../components/VitalCard';
import { ActivityIndicator } from 'react-native';

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
  const [isOffline, setIsOffline] = useState(false);
  const [motherData, setMotherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFromApi('/mother');
        setMotherData(data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !motherData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Ionicons name="cloud-offline-outline" size={64} color={Colors.textMuted} />
        <Text style={[styles.greeting, { marginTop: 16, textAlign: 'center' }]}>{error || 'No data available'}</Text>
        <TouchableOpacity style={[styles.directionsBtn, { marginTop: 24 }]} onPress={() => router.replace('/(mother)' as any)}>
          <Text style={styles.directionsBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Priya 🌿</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity 
              style={styles.profileBtn}
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

        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>Offline — data synced from patch</Text>
          </View>
        )}

        <TouchableOpacity style={[styles.voiceCard, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} activeOpacity={0.8}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.voiceTitle}>All is well today, Priya</Text>
            <Text style={styles.voiceSub}>Tap to hear guidance in Tamil</Text>
          </View>
          <Ionicons name="mic-circle" size={40} color={Colors.teal} />
        </TouchableOpacity>

        <RiskRing score={motherData.pprs} status={motherData.pprsStatus as any} />

        <View style={styles.vitalsGrid}>
          <View style={styles.vitalRow}>
            <VitalCard icon="heart" value={motherData.vitals.hr.toString()} unit="bpm" label="Heart Rate" />
            <VitalCard icon="water" value={motherData.vitals.bp} unit="mmHg" label="Blood Pressure" />
          </View>
          <View style={styles.vitalRow}>
            <VitalCard icon="pulse" value={motherData.vitals.spo2.toString()} unit="%" label="Oxygen Saturation" />
            <VitalCard icon="thermometer" value={motherData.vitals.temp.toString()} unit="°C" label="Temperature" />
          </View>
        </View>



        <View style={{ marginTop: 8 }}>


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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionBtn({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
      <Text style={styles.actionBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

function TipChip({ text, type }: { text: string, type: 'blue' | 'orange' }) {
  const isBlue = type === 'blue';
  return (
    <View style={[styles.tipChip, { backgroundColor: isBlue ? '#EAF3FA' : '#FAEEDA' }]}>
      <Text style={[styles.tipChipText, { color: isBlue ? '#0056B3' : '#854F0B' }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 20, fontWeight: '600', color: Colors.textPrimary },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  connIcons: { flexDirection: 'row', gap: 6 },
  connDot: { width: 10, height: 10, borderRadius: 5 },
  offlineBanner: {
    backgroundColor: Colors.warningLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  offlineText: { color: Colors.warning, fontSize: 13, fontWeight: '500' },
  voiceCard: {
    backgroundColor: Colors.tealLight,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  voiceTextContainer: { flex: 1 },
  voiceTitle: { fontSize: 15, fontWeight: '700', color: Colors.teal, marginBottom: 2 },
  voiceSub: { fontSize: 12, color: Colors.teal, opacity: 0.8 },
  vitalsGrid: { marginBottom: 16 },
  vitalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  chipGreen: { backgroundColor: Colors.successLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  chipGreenText: { color: Colors.success, fontSize: 12, fontWeight: '600' },
  caption: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginTop: 12 },
  actionRow: { gap: 10, marginTop: 8 },
  actionBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 100,
    height: 42,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  actionBtnText: { fontSize: 13, fontWeight: '500', color: Colors.textPrimary },

  // New Light Cards styling
  lightCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  weekBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  weekBadgeText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  weekScroll: { paddingBottom: 16, gap: 8 },
  weekDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  weekDotPast: { backgroundColor: Colors.primary },
  weekDotCurrent: { backgroundColor: 'white', borderWidth: 2, borderColor: Colors.primary },
  weekDotFuture: { backgroundColor: 'white', borderWidth: 1, borderColor: Colors.border },
  weekDotText: { fontSize: 13, fontWeight: '700' },
  progressBg: { height: 6, backgroundColor: Colors.bg, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary },
  progressText: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16, marginLeft: 4 },
  quickAccessContainer: { marginBottom: 24, marginTop: 8 },
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  quickAccessCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  qaIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  qaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  checkupRow: { flexDirection: 'row', alignItems: 'center' },
  calendarIconBg: { width: 48, height: 48, borderRadius: 12, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  checkupInfo: { flex: 1 },
  checkupTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 2 },
  checkupSub: { color: Colors.textMuted, fontSize: 13, marginBottom: 8 },
  directionsBtn: { alignSelf: 'flex-start', borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  directionsBtnText: { color: Colors.textPrimary, fontSize: 13, fontWeight: '600' }
});
