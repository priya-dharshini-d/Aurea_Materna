import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';
import { doctorData } from '../../constants/MockData';
import StatCard from '../../components/StatCard';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width - 64;

import { useRouter } from 'expo-router';

export default function DoctorOverview() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.phcName}>{doctorData.phc}</Text>
            <Text style={styles.docName}>{doctorData.name} · Obstetrics</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1 Emergency</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileBtn}
              onPress={() => router.push('/(doctor)/profile' as any)}
            >
              <Ionicons name="person" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statRow}>
          <View style={{ width: 140 }}><StatCard number={47} label="Active patients" delta="+3 this week" deltaType="up" /></View>
          <View style={{ width: 140 }}><StatCard number={1} label="High risk" delta="Needs review" deltaType="down" color={Colors.danger} /></View>
          <View style={{ width: 140 }}><StatCard number={8} label="Watch" delta="Monitoring" color={Colors.warning} /></View>
        </ScrollView>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Risk Distribution Today</Text>
          <PieChart
            data={[
              { name: 'Normal', count: 38, color: Colors.success, legendFontColor: Colors.textMuted },
              { name: 'Watch', count: 8, color: Colors.warning, legendFontColor: Colors.textMuted },
              { name: 'High risk', count: 1, color: Colors.danger, legendFontColor: Colors.textMuted }
            ]}
            width={screenWidth}
            height={160}
            chartConfig={{ color: (opacity = 1) => `rgba(0,0,0, ${opacity})` }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>BP Trend — All Patients (7 days)</Text>
          <LineChart
            data={{
              labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
              datasets: [
                { data: doctorData.bpTrend7Day, color: (o) => Colors.primary },
                { data: [140, 140, 140, 140, 140, 140, 140], color: (o) => Colors.danger, strokeWidth: 1 }
              ]
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>PPRS Distribution</Text>
          <PPRSRow label="Green (70–100)" count={38} color={Colors.success} percent={81} />
          <PPRSRow label="Amber (40–69)" count={8} color={Colors.warning} percent={17} />
          <PPRSRow label="Red (0–39)" count={1} color={Colors.danger} percent={2} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function PPRSRow({ label, count, color, percent }: any) {
  return (
    <View style={styles.pprsRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.pprsLabel}>{label}</Text>
        <View style={styles.progBg}>
          <View style={[styles.progFill, { width: `${percent}%`, backgroundColor: color }]} />
        </View>
      </View>
      <Text style={[styles.pprsCount, { color }]}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  phcName: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  docName: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  badge: { backgroundColor: Colors.danger, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 12 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  statRow: { gap: 8, marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  chart: { marginVertical: 8, borderRadius: 16 },
  pprsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  pprsLabel: { fontSize: 12, color: Colors.textMuted, marginBottom: 4 },
  progBg: { height: 8, backgroundColor: Colors.bg, borderRadius: 4 },
  progFill: { height: 8, borderRadius: 4 },
  pprsCount: { minWidth: 36, textAlign: 'right', fontSize: 16, fontWeight: '600', marginLeft: 12 }
});
