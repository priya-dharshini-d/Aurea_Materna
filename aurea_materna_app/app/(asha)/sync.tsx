import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import ConnectivityBar from '../../components/ConnectivityBar';

export default function AshaSync() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Connectivity</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status</Text>
          <View style={styles.chipsRow}>
            <ConnectivityBar label="BLE" status="Active" />
            <ConnectivityBar label="LoRa" status="Active" />
            <ConnectivityBar label="Cellular" status="Weak" />
            <ConnectivityBar label="WiFi" status="Offline" />
          </View>
          
          <Text style={styles.syncMeta}>Last cloud sync: 47 min ago via LoRa gateway</Text>
          <View style={styles.progBg}>
            <View style={styles.progFill} />
          </View>
          <Text style={styles.progLabel}>18 of 18 devices synced today</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>SMS Fallback Log</Text>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineCol}>
              <View style={[styles.timelineDot, { backgroundColor: Colors.warning }]} />
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>10:23 AM</Text>
              <Text style={styles.timelineText}>Alert SMS sent to Dr. Ramesh for Lakshmi P.</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineCol}>
              <View style={[styles.timelineDot, { backgroundColor: Colors.success }]} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>8:00 AM</Text>
              <Text style={styles.timelineText}>Daily summary sent via SMS to 3 doctors</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  syncMeta: { fontSize: 12, color: Colors.textMuted, marginBottom: 8 },
  progBg: { height: 6, backgroundColor: Colors.bg, borderRadius: 3, marginBottom: 6 },
  progFill: { height: '100%', width: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progLabel: { fontSize: 11, color: Colors.textPrimary },
  timelineItem: { flexDirection: 'row', minHeight: 50 },
  timelineCol: { alignItems: 'center', width: 20, marginRight: 12 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.border, marginTop: 4 },
  timelineContent: { flex: 1, paddingBottom: 16 },
  timelineTime: { fontSize: 12, color: Colors.textMuted, marginBottom: 2 },
  timelineText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 18 }
});
