import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { adminData, ashaData } from '../../constants/MockData';
import MotherRow from '../../components/MotherRow';

export default function AdminHeatmap() {
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  const getStyle = (status: string) => {
    if (status === 'red') return { bg: Colors.dangerLight, border: Colors.danger, color: Colors.danger, icon: '🔴 Alert' };
    if (status === 'amber') return { bg: Colors.warningLight, border: Colors.warning, color: Colors.warning, icon: '🟡 Watch' };
    return { bg: Colors.successLight, border: Colors.success, color: Colors.success, icon: '🟢 Safe' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Village-level risk heatmap</Text>
      </View>

      <FlatList
        data={adminData.villages}
        keyExtractor={item => item.name}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const s = getStyle(item.status);
          return (
            <TouchableOpacity 
              style={[styles.villageCard, { backgroundColor: s.bg, borderColor: s.border }]}
              onPress={() => setSelectedVillage(item.name)}
            >
              <Text style={[styles.vName, { color: s.color }]}>{item.name}</Text>
              <Text style={[styles.vCount, { color: s.color }]}>{item.mothers} mothers</Text>
              <Text style={[styles.vStatus, { color: s.color }]}>{s.icon}</Text>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={styles.legend}>
            <Text style={[styles.legendText, { color: Colors.success }]}>🟢 PPRS 70–100</Text>
            <Text style={[styles.legendText, { color: Colors.warning }]}>🟡 PPRS 40–69</Text>
            <Text style={[styles.legendText, { color: Colors.danger }]}>🔴 PPRS 0–39</Text>
          </View>
        }
      />

      <Modal visible={!!selectedVillage} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedVillage} Mothers</Text>
            <TouchableOpacity onPress={() => setSelectedVillage(null)}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {ashaData.mothers.map(m => (
              <MotherRow key={m.id} {...m} status={m.status as any} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 16, paddingBottom: 8 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  list: { padding: 12, paddingBottom: 40 },
  row: { justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 8 },
  villageCard: { flex: 0.48, borderWidth: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  vName: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  vCount: { fontSize: 12, marginBottom: 4 },
  vStatus: { fontSize: 12, fontWeight: '600' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 24 },
  legendText: { fontSize: 11, fontWeight: '600' },
  modalContainer: { flex: 1, backgroundColor: Colors.bg },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  closeBtn: { fontSize: 16, color: Colors.primary, fontWeight: '600' }
});
