import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/Colors';
import { adminData } from '../../constants/MockData';
import { Ionicons } from '@expo/vector-icons';

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

        <Text style={styles.pageTitle}>Monthly Reports</Text>

        <ReportCard 
          title="April 2026 — District Summary" 
          sub="1,247 mothers · 3 outcomes · PDF" 
          icon="document-text" 
        />
        <ReportCard 
          title="Q1 2026 — Outcome Analysis" 
          sub="Preterm prevention · XLSX" 
          icon="stats-chart" 
        />

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

function ReportCard({ title, sub, icon }: any) {
  return (
    <View style={styles.reportCard}>
      <View style={styles.reportIconBg}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={styles.reportInfo}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.reportSub}>{sub}</Text>
      </View>
      <TouchableOpacity 
        style={styles.exportBtn}
        onPress={() => Alert.alert("Exporting", `Preparing ${title} for download...`)}
      >
        <Text style={styles.exportBtnText}>Export</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16, marginTop: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  chart: { marginVertical: 8, borderRadius: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  legendBox: { width: 12, height: 12, borderRadius: 2, marginRight: 6 },
  legendText: { fontSize: 11, color: Colors.textMuted },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  impactLabel: { fontSize: 12, color: Colors.textMuted },
  impactPct: { fontSize: 13, color: Colors.success, fontWeight: '600' },
  
  // Report Card Styles
  reportCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  reportIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  reportSub: { fontSize: 11, color: Colors.textMuted },
  exportBtn: { backgroundColor: '#F8FAFC', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  exportBtnText: { fontSize: 13, fontWeight: '700', color: '#0F172A' }
});
