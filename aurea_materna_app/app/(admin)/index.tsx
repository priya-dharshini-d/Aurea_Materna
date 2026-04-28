import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackedBarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native';
import StatCard from '../../components/StatCard';
import { Ionicons } from '@expo/vector-icons';
import { adminData as mockAdminData } from '../../constants/MockData';

const screenWidth = Dimensions.get('window').width - 64;

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
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!adminData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.headerCard}>
          <Text style={styles.headerLabel}>Government Health Dept · Tamil Nadu</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Aurea Materna Dashboard</Text>
            <TouchableOpacity 
              style={styles.profileBtn}
              onPress={() => router.push('/(admin)/profile' as any)}
            >
              <Ionicons name="person" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerLabel}>District: {adminData.district} · Last update: 2 min ago</Text>
        </View>

        <View style={styles.grid2}>
          <StatCard number={adminData.totalEnrolled.toLocaleString()} label="Total mothers enrolled" delta="+84 this month" deltaType="up" />
          <StatCard number={adminData.activeDevices.toLocaleString()} label="Devices active" delta="87% coverage" deltaType="up" />
        </View>
        <View style={styles.grid2}>
          <StatCard number={adminData.highRisk} label="High risk" delta="↑ 4 from last week" deltaType="down" color={Colors.danger} />
          <StatCard number={`${adminData.adherenceRate}%`} label="Adherence rate" delta="+2% vs last month" deltaType="up" color={Colors.success} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>District risk trend (4 weeks)</Text>
          <StackedBarChart
            data={{
              labels: ['W1', 'W2', 'W3', 'W4'],
              legend: ['Normal', 'Watch', 'High risk'],
              data: [
                [820, 180, 40],
                [854, 160, 33],
                [901, 145, 30],
                [951, 135, 23]
              ],
              barColors: [Colors.success, Colors.warning, Colors.danger]
            }}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            hideLegend={false}
            style={styles.chart}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key impact metrics</Text>
          
          <MetricRow label="Maternal mortality (this year)" val="0 deaths ↓ 3 YoY" color={Colors.success} />
          <MetricRow label="Preterm births prevented (est.)" val="18 this quarter" color={Colors.success} />
          <MetricRow label="Emergency referrals escalated" val="47 (avg 4h response)" color={Colors.textPrimary} />
          <MetricRow label="ASHA workers trained" val="62 of 68 certified" color={Colors.textPrimary} isLast />
        </View>

      </ScrollView>
    </SafeAreaView>
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
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  headerCard: { backgroundColor: Colors.primary, borderRadius: 20, padding: 20, marginBottom: 16 },
  headerLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: '700', marginVertical: 6, flex: 1 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  grid2: { flexDirection: 'row', marginBottom: 8 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginTop: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  chart: { marginVertical: 8, borderRadius: 16 },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  metricLabel: { fontSize: 12, color: Colors.textMuted },
  metricVal: { fontSize: 13, fontWeight: '600' }
});
