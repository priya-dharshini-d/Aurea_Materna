import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MotherNotifications() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Green Alert */}
        <View style={[styles.card, { backgroundColor: Colors.successLight, borderLeftColor: Colors.success, borderLeftWidth: 4 }]}>
          <Text style={[styles.cardTitle, { color: Colors.success }]}>All vitals normal</Text>
          <Text style={styles.cardSub}>Today 6:00 AM · Patch confirmed normal readings</Text>
        </View>

        {/* Amber Alert */}
        <View style={[styles.card, { backgroundColor: Colors.warningLight, borderLeftColor: Colors.warning, borderLeftWidth: 4 }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors.warning }]}>Blood pressure slightly elevated</Text>
            <Text style={styles.attentionTag}>Attention</Text>
          </View>
          <Text style={styles.cardSub}>Yesterday 2:30 PM · 132/88 mmHg detected</Text>
          <TouchableOpacity style={[styles.actionBtn, { borderColor: Colors.warning }]}>
            <Text style={[styles.actionBtnText, { color: Colors.warning }]}>What should I do?</Text>
          </TouchableOpacity>
        </View>

        {/* Green Alert */}
        <View style={[styles.card, { backgroundColor: Colors.successLight, borderLeftColor: Colors.success, borderLeftWidth: 4 }]}>
          <Text style={[styles.cardTitle, { color: Colors.success }]}>Fetal movement confirmed</Text>
          <Text style={styles.cardSub}>Yesterday 10:00 AM · 10 kicks in 2 hours ✓</Text>
        </View>

        {/* Amber Alert 2 */}
        <View style={[styles.card, { backgroundColor: Colors.warningLight, borderLeftColor: Colors.warning, borderLeftWidth: 4 }]}>
          <Text style={[styles.cardTitle, { color: Colors.warning }]}>Medication reminder</Text>
          <Text style={styles.cardSub}>Take iron + folic acid with lunch</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.actionBtn, { flex: 1, borderColor: Colors.warning }]}>
              <Text style={[styles.actionBtnText, { color: Colors.warning }]}>Taken ✓</Text>
            </TouchableOpacity>
            <View style={{ width: 12 }} />
            <TouchableOpacity style={[styles.actionBtn, { flex: 1, borderColor: Colors.warning, opacity: 0.7 }]}>
              <Text style={[styles.actionBtnText, { color: Colors.warning }]}>Remind later</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ASHA Worker Assigned</Text>
        
        <View style={styles.ashaCard}>
          <View style={styles.ashaAvatar}>
            <Ionicons name="person" size={24} color={Colors.primary} />
          </View>
          <View style={styles.ashaInfo}>
            <Text style={styles.ashaName}>Meena Devi (ASHA)</Text>
            <Text style={styles.ashaSub}>Reviewing your last reading now</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scroll: { padding: 16, paddingBottom: 40 },
  
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  cardSub: { fontSize: 13, color: Colors.textMuted, marginBottom: 12 },
  attentionTag: { color: Colors.warning, fontSize: 12, fontWeight: '700' },
  
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { borderWidth: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.5)' },
  actionBtnText: { fontSize: 14, fontWeight: '600' },
  
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginTop: 16, marginBottom: 16 },
  
  ashaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  ashaAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  ashaInfo: { flex: 1 },
  ashaName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  ashaSub: { fontSize: 12, color: Colors.textMuted },
  callBtn: { borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  callBtnText: { color: Colors.textPrimary, fontSize: 13, fontWeight: '600' }
});
