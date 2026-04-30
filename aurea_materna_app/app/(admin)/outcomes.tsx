import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          <Text style={styles.cardTitle}>Clinical Outcomes</Text>
          
          <OutcomeComparison 
            label="Maternal Deaths" 
            before={3} 
            after={0} 
            max={5} 
          />
          
          <OutcomeComparison 
            label="Preterm Births" 
            before={29} 
            after={18} 
            max={40} 
          />
          
          <OutcomeComparison 
            label="Avg Response (h)" 
            before={18} 
            after={4} 
            max={24} 
          />

          <View style={styles.legend}>
            <View style={[styles.legendBox, { backgroundColor: '#8E9AAF' }]} />
            <Text style={styles.legendText}>Before Aurea Materna</Text>
            <View style={[styles.legendBox, { backgroundColor: '#006D5B', marginLeft: 16 }]} />
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

function OutcomeComparison({ label, before, after, max }: any) {
  const beforePct = (before / max) * 100;
  const afterPct = (after / max) * 100;

  return (
    <View style={styles.outcomeRow}>
      <Text style={styles.outcomeLabel}>{label}</Text>
      
      <View style={styles.barGroup}>
        <Text style={styles.barVal}>{before}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${beforePct}%`, backgroundColor: '#8E9AAF' }]} />
        </View>
      </View>
      
      <View style={styles.barGroup}>
        <Text style={[styles.barVal, { color: '#006D5B' }]}>{after}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${afterPct}%`, backgroundColor: '#006D5B' }]} />
        </View>
      </View>
    </View>
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
  container: { flex: 1, backgroundColor: '#F8F9F8' },
  scroll: { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 16, marginTop: 16 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A4D6E', marginBottom: 16 },
  
  outcomeRow: { marginBottom: 20 },
  outcomeLabel: { fontSize: 13, fontWeight: '600', color: '#1A1A1A', marginBottom: 8 },
  barGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  barVal: { width: 24, fontSize: 12, fontWeight: '700', color: '#64748B' },
  barBg: { flex: 1, height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  
  legend: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  legendBox: { width: 12, height: 12, borderRadius: 3, marginRight: 6 },
  legendText: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  
  impactRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  impactLabel: { fontSize: 13, color: '#64748B' },
  impactPct: { fontSize: 13, color: '#059669', fontWeight: '700' },
  
  reportCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 24, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  reportIconBg: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  reportSub: { fontSize: 11, color: '#64748B' },
  exportBtn: { backgroundColor: '#F8FAFC', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  exportBtnText: { fontSize: 12, fontWeight: '700', color: '#0F172A' }
});
