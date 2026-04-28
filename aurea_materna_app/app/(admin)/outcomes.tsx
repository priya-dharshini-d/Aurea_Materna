import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';
import { adminData } from '../../constants/MockData';

const screenWidth = Dimensions.get('window').width - 64;

export default function AdminOutcomes() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Clinical Outcomes</Text>

        <View style={styles.card}>
          <BarChart
            data={{
              labels: ['Deaths', 'Preterm', 'Avg resp(h)'],
              datasets: [
                { data: [3, 29, 18] }, // Before
              ]
            }}
            width={screenWidth}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(136, 135, 128, ${opacity})`,
              barPercentage: 0.5,
            }}
            style={styles.chart}
          />
          <BarChart
            data={{
              labels: ['Deaths', 'Preterm', 'Avg resp(h)'],
              datasets: [
                { data: [0, 18, 4] }, // After
              ]
            }}
            width={screenWidth}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(24, 95, 165, ${opacity})`,
              barPercentage: 0.5,
            }}
            style={[styles.chart, { marginTop: -200, opacity: 0.8 }]} // Overlay to simulate grouped
          />
          <View style={styles.legend}>
            <View style={[styles.legendBox, { backgroundColor: '#888780' }]} />
            <Text style={styles.legendText}>Before Aurea Materna</Text>
            <View style={[styles.legendBox, { backgroundColor: Colors.primary, marginLeft: 16 }]} />
            <Text style={styles.legendText}>After deployment</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Program impact vs baseline</Text>
          
          <ImpactRow label="Maternal mortality rate" pct={`${adminData.impactMetrics.mortalityReduction}%`} />
          <ImpactRow label="Preterm births" pct={`${adminData.impactMetrics.pretermReduction}%`} />
          <ImpactRow label="Emergency escalation time" pct="from 18h to 4h" />
          <ImpactRow label="Healthcare cost per mother" pct={`${adminData.impactMetrics.costReduction}%`} isLast />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function ImpactRow({ label, pct, isLast }: any) {
  return (
    <View style={[styles.impactRow, !isLast && styles.borderBottom]}>
      <Text style={styles.impactLabel}>{label}</Text>
      <Text style={styles.impactPct}>↓ {pct}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  chart: { marginVertical: 8, borderRadius: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  legendBox: { width: 12, height: 12, borderRadius: 2, marginRight: 6 },
  legendText: { fontSize: 11, color: Colors.textMuted },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  impactLabel: { fontSize: 12, color: Colors.textMuted },
  impactPct: { fontSize: 13, color: Colors.success, fontWeight: '600' }
});
