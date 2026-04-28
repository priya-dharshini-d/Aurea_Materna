import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native';
import MotherRow from '../../components/MotherRow';
import { doctorData as mockDoctorData } from '../../constants/MockData';

export default function DoctorPatients() {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    setDoctorData(mockDoctorData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!doctorData) return null;

  const handleReferral = () => {
    Alert.alert(
      "Refer to Hospital?",
      `Are you sure you want to refer ${selectedPatient?.name} for immediate hospital admission?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          style: "destructive", 
          onPress: () => {
            Alert.alert("Success", "Patient referral triggered successfully.");
            setSelectedPatient(null);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Patient List</Text>

        <View style={styles.list}>
          {doctorData.patients.map(p => (
            <MotherRow 
              key={p.id}
              {...p}
              status={p.status as any}
              onPress={() => setSelectedPatient(p)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selectedPatient} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelectedPatient(null)}>
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Patient Detail</Text>
              <TouchableOpacity onPress={() => setSelectedPatient(null)}>
                <Text style={styles.closeBtn}>Close</Text>
              </TouchableOpacity>
            </View>

            {selectedPatient && (
              <>
                <Text style={styles.patName}>{selectedPatient.name}</Text>
                <View style={styles.chipsRow}>
                  <Text style={[styles.chip, { backgroundColor: Colors.dangerLight, color: Colors.danger }]}>Red Alert</Text>
                  <Text style={[styles.chip, { backgroundColor: Colors.primaryLight, color: Colors.primary }]}>Week {selectedPatient.week}</Text>
                  <Text style={[styles.chip, { backgroundColor: Colors.bg }]}>Primigravida</Text>
                </View>

                <View style={styles.grid2}>
                  <View style={styles.statBox}>
                    <Text style={[styles.statVal, { color: Colors.danger }]}>{selectedPatient.bp}</Text>
                    <Text style={styles.statLbl}>Blood pressure</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={[styles.statVal, { color: Colors.danger }]}>{selectedPatient.pprs}</Text>
                    <Text style={styles.statLbl}>PPRS score</Text>
                  </View>
                </View>

                <View style={styles.aiBox}>
                  <Text style={styles.aiTitle}>AI Clinical Recommendation</Text>
                  <Text style={styles.aiText}>
                    Preeclampsia probability: <Text style={{ fontWeight: '700' }}>73%</Text>. PlGF-based model indicates impaired placental circulation. Consider: MgSO₄ prophylaxis, aspirin review, expedited delivery planning if ≥34 weeks.
                  </Text>
                  <View style={styles.shapRow}>
                    <Text style={styles.shapChip}>MAP ↑</Text>
                    <Text style={styles.shapChip}>uPI ↑</Text>
                    <Text style={styles.shapChip}>HRV ↓</Text>
                  </View>
                </View>

                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.btnRefer} onPress={handleReferral}>
                    <Text style={styles.btnReferText}>Refer to Hospital</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnTele}>
                    <Text style={styles.btnTeleText}>Teleconsult</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  list: { backgroundColor: 'white', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  
  modalContainer: { flex: 1, backgroundColor: Colors.bg },
  modalScroll: { padding: 16, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700' },
  closeBtn: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
  patName: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  chipsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 11, fontWeight: '600', overflow: 'hidden' },
  grid2: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  statVal: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  statLbl: { fontSize: 12, color: Colors.textMuted },
  aiBox: { backgroundColor: Colors.dangerLight, borderRadius: 16, padding: 16, marginBottom: 20 },
  aiTitle: { fontSize: 13, fontWeight: '700', color: Colors.danger, marginBottom: 6 },
  aiText: { fontSize: 12, color: Colors.textPrimary, lineHeight: 18 },
  shapRow: { flexDirection: 'row', gap: 6, marginTop: 10 },
  shapChip: { fontSize: 10, color: Colors.textMuted, backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, overflow: 'hidden' },
  btnRow: { flexDirection: 'row', gap: 12 },
  btnRefer: { flex: 1, backgroundColor: Colors.danger, height: 44, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  btnReferText: { color: 'white', fontSize: 14, fontWeight: '600' },
  btnTele: { flex: 1, backgroundColor: 'transparent', height: 44, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  btnTeleText: { color: Colors.textPrimary, fontSize: 14, fontWeight: '600' }
});
