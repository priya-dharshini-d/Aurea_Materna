import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import AlertCard from '../../components/AlertCard';

export default function DoctorAlerts() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Alert Centre</Text>

        <AlertCard 
          level="red" 
          title="EMERGENCY — Lakshmi P." 
          subtitle="BP 148/94 at 10:15 AM · PPRS dropped to 45 from 68 in 48 hours · ASHA notified"
          onCall={() => {}} 
          onEscalate={() => {}} 
        />
        
        <AlertCard 
          level="amber" 
          title="Gomathi S. — Repeated high BP readings" 
          subtitle="126/82 yesterday · 129/84 today · Trend worsening"
        />
        
        <AlertCard 
          level="green" 
          title="38 patients — All normal today" 
          subtitle="Automated daily review completed at 6:00 AM"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 20, paddingBottom: 40 },
  pageTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#0F172A', 
    marginBottom: 24,
    marginTop: 10 
  },
});
