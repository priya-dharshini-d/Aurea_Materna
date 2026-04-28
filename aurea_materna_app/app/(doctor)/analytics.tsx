import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width - 64;

export default function DoctorAnalytics() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Analytics</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Outcomes</Text>
          <BarChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr'],
              datasets: [{ data: [32, 34, 36, 38] }]
            }}
            width={screenWidth}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: 'white', backgroundGradientFrom: 'white', backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(99, 153, 34, ${opacity})`,
              barPercentage: 0.5,
            }}
            style={styles.chart}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Risk factors prevalence</Text>
          
          <HeatmapRow label="Hypertension" pct="18%" color={Colors.danger} bg={Colors.dangerLight} />
          <HeatmapRow label="Anaemia" pct="34%" color={Colors.warning} bg={Colors.warningLight} />
          <HeatmapRow label="Low weight" pct="22%" color={Colors.warning} bg={Colors.warningLight} />
          <HeatmapRow label="Diabetes" pct="12%" color={Colors.danger} bg={Colors.dangerLight} />
          <HeatmapRow label="Normal" pct="68%" color={Colors.success} bg={Colors.successLight} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function HeatmapRow({ label, pct, color, bg }: any) {
  return (
    <View style={styles.heatmapRow}>
      <Text style={styles.heatmapLabel}>{label}</Text>
      <View style={[styles.heatmapCell, { backgroundColor: bg }]}>
        <Text style={[styles.heatmapCellText, { color }]}>{pct}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  chart: { marginVertical: 8, borderRadius: 16 },
  heatmapRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  heatmapLabel: { width: 100, fontSize: 12, color: Colors.textMuted, textAlign: 'right', paddingRight: 12 },
  heatmapCell: { flex: 1, height: 32, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  heatmapCellText: { fontSize: 12, fontWeight: '600' }
});
