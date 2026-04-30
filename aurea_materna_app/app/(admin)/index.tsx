import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import StatCard from '../../components/StatCard';
import { Ionicons } from '@expo/vector-icons';
import { adminData as mockAdminData } from '../../constants/MockData';
import { useRouter } from 'expo-router';

export default function AdminOverview() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAdminData(mockAdminData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1A4D6E" />
      </View>
    );
  }

  if (!adminData) return null;

  const chartData = [
    { label: 'W1', values: [820, 180, 40], total: 1040 },
    { label: 'W2', values: [854, 160, 33], total: 1047 },
    { label: 'W3', values: [901, 145, 30], total: 1076 },
    { label: 'W4', values: [951, 135, 23], total: 1109 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Home</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.headerBtn, { marginRight: 12 }]}
              onPress={() => Alert.alert("Notifications", "No new alerts.")}
            >
              <Ionicons name="notifications" size={24} color="#1E293B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => router.push('/(admin)/profile' as any)}
            >
              <Ionicons name="person" size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <StatCard number="1,247" label="Total mothers enrolled" delta="+84 this month" deltaType="up" />
            <StatCard number="1,089" label="Devices active" delta="87% coverage" deltaType="up" color="#166534" />
          </View>
          <View style={styles.row}>
            <StatCard number="23" label="High risk" delta="↑ 4 from last week" deltaType="down" color="#B91C1C" />
            <StatCard number="94%" label="Adherence rate" delta="+2% vs last month" deltaType="up" color="#166534" />
          </View>
        </View>

        {/* Custom Chart Card - MATCHING REFERENCE IMAGE */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>District risk trend (4 weeks)</Text>
          
          <View style={styles.chartWrapper}>
            <View style={styles.barsArea}>
              {chartData.map((week, idx) => (
                <View key={idx} style={styles.barCol}>
                  <View style={styles.barStack}>
                    {/* Normal */}
                    <View style={[styles.barPart, { flex: week.values[0], backgroundColor: '#3B82F6' }]} />
                    {/* Watch */}
                    <View style={[styles.barPart, { flex: week.values[1], backgroundColor: '#F59E0B' }]} />
                    {/* High Risk */}
                    <View style={[styles.barPart, { flex: week.values[2], backgroundColor: '#EF4444' }]} />
                  </View>
                  <Text style={styles.xLabel}>{week.label}</Text>
                  <Text style={styles.totalLabel}>{week.total}</Text>
                </View>
              ))}
            </View>

            {/* Bottom Legend */}
            <View style={styles.bottomLegend}>
               <LegendItem color="#3B82F6" label="Normal" />
               <LegendItem color="#F59E0B" label="Watch" />
               <LegendItem color="#EF4444" label="High risk" />
            </View>
          </View>
        </View>

        {/* Impact Metrics Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key impact metrics</Text>
          <MetricRow label="Maternal mortality (this year)" val="0 deaths ↓ 3 YoY" color="#166534" />
          <MetricRow label="Preterm births prevented (est.)" val="18 this quarter" color="#166534" />
          <MetricRow label="Emergency referrals escalated" val="47 (avg 4h response)" color="#1E293B" isLast />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSquare, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

function MetricRow({ label, val, color, isLast }: any) {
  return (
    <View style={[styles.metricRow, !isLast && styles.borderBottom]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricVal, { color }]}>{val}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9F8' },
  scroll: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  greeting: { fontSize: 32, fontWeight: '900', color: '#0F172A' },
  headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  
  gridContainer: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  
  card: { backgroundColor: 'white', borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 20 },
  
  // Clean Chart Styles matching reference image
  chartWrapper: { paddingBottom: 10 },
  barsArea: { height: 200, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 20 },
  barCol: { alignItems: 'center', flex: 1 },
  barStack: { width: 32, height: 160, borderRadius: 8, overflow: 'hidden', flexDirection: 'column-reverse' },
  barPart: { width: '100%' },
  
  xLabel: { fontSize: 12, fontWeight: '700', color: '#94A3B8', marginTop: 10 },
  totalLabel: { fontSize: 11, fontWeight: '600', color: '#64748B', marginTop: 2 },
  
  bottomLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendSquare: { width: 14, height: 14, borderRadius: 4 },
  legendText: { fontSize: 13, color: '#64748B', fontWeight: '500' },

  metricRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  metricLabel: { fontSize: 14, color: '#64748B' },
  metricVal: { fontSize: 14, fontWeight: '700' }
});
