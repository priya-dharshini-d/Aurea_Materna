import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import AlertCard from '../../components/AlertCard';

export default function DoctorAlerts() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Alert Centre</Text>

        <AlertCard 
          level="red" 
          title="🔴 EMERGENCY — Lakshmi P." 
          subtitle="BP 148/94 at 10:15 AM · PPRS dropped to 45 from 68 in 48 hours · ASHA notified"
          onCall={() => {}} 
          onEscalate={() => {}} 
        />
        <AlertCard 
          level="amber" 
          title="⚠️ Gomathi S. — Repeated high BP readings" 
          subtitle="126/82 yesterday · 129/84 today · Trend worsening"
        />
        <AlertCard 
          level="green" 
          title="✅ 38 patients — All normal today" 
          subtitle="Automated daily review completed at 6:00 AM"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
});
