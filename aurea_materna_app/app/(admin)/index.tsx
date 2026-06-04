import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        
        {/* Header (Mother Style) */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Home</Text>
          </View>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.profileBtn, { marginRight: 10 }]}
              onPress={() => Alert.alert("Notifications", "No new alerts.")}
            >
              <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => router.push('/(admin)/profile' as any)}
            >
              <Ionicons name="person" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
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
          <View style={{ marginTop: 16 }}>
            <CustomStackedBars
              weeks={['W1', 'W2', 'W3', 'W4']}
              data={[
                [820, 180, 40],
                [854, 160, 33],
                [901, 145, 30],
                [951, 135, 23],
              ]}
              colors={['#3B82F6', '#F59E0B', '#EF4444']}
              labels={['Normal', 'Watch', 'High risk']}
            />
          </View>
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

function CustomStackedBars({ weeks, data, colors, labels }: any) {
  const maxTotal = Math.max(...data.map((d: number[]) => d.reduce((a: number, b: number) => a + b, 0)));
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 160, marginBottom: 8 }}>
        {data.map((bars: number[], wi: number) => {
          const total = bars.reduce((a: number, b: number) => a + b, 0);
          return (
            <View key={wi} style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ width: 36, height: Math.round((total / maxTotal) * 140), borderRadius: 8, overflow: 'hidden', justifyContent: 'flex-end' }}>
                {[...bars].reverse().map((val: number, si: number) => (
                  <View key={si} style={{ width: '100%', flex: val, backgroundColor: [...colors].reverse()[si] }} />
                ))}
              </View>
              <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 6, fontWeight: '600' }}>{weeks[wi]}</Text>
              <Text style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{total}</Text>
            </View>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 8 }}>
        {labels.map((lbl: string, i: number) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: colors[i] }} />
            <Text style={{ fontSize: 11, color: '#64748B' }}>{lbl}</Text>
          </View>
        ))}
      </View>
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
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDFA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 12, borderWidth: 1, borderColor: '#CCFBF1' },
  verifiedText: { color: '#0F766E', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  districtSub: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  grid2: { flexDirection: 'row', marginBottom: 8 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginTop: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  chart: { marginVertical: 8, borderRadius: 16 },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  metricLabel: { fontSize: 12, color: Colors.textMuted },
  metricVal: { fontSize: 13, fontWeight: '600' }
});
