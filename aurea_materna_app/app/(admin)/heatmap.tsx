import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { adminData, ashaData } from '../../constants/MockData';
import MotherRow from '../../components/MotherRow';
import { Ionicons } from '@expo/vector-icons';

export default function AdminHeatmap() {
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  const getStyle = (status: string) => {
    if (status === 'red') return { bg: '#FCEBEB', border: '#F87171', color: '#991B1B', icon: 'alert-circle', label: 'Alert' };
    if (status === 'amber') return { bg: '#FFF7ED', border: '#FB923C', color: '#9A3412', icon: 'warning', label: 'Watch' };
    return { bg: '#F0FDF4', border: '#4ADE80', color: '#166534', icon: 'checkmark-circle', label: 'Safe' };
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
              activeOpacity={0.8}
              onPress={() => setSelectedVillage(item.name)}
            >
              <Text style={[styles.vName, { color: s.color }]}>{item.name}</Text>
              <Text style={[styles.vCount, { color: s.color }]}>{item.mothers} mothers</Text>
              <View style={styles.badge}>
                <Ionicons name={s.icon as any} size={14} color={s.color} />
                <Text style={[styles.vStatus, { color: s.color }]}>{s.label}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={styles.legend}>
            <View style={styles.legendItem}>
               <Ionicons name="checkmark-circle" size={16} color="#166534" />
               <Text style={[styles.legendText, { color: '#166534' }]}>PPRS 70–100</Text>
            </View>
            <View style={styles.legendItem}>
               <Ionicons name="warning" size={16} color="#9A3412" />
               <Text style={[styles.legendText, { color: '#9A3412' }]}>PPRS 40–69</Text>
            </View>
            <View style={styles.legendItem}>
               <Ionicons name="alert-circle" size={16} color="#991B1B" />
               <Text style={[styles.legendText, { color: '#991B1B' }]}>PPRS 0–39</Text>
            </View>
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
  container: { flex: 1, backgroundColor: 'white' },
  header: { padding: 20, paddingBottom: 10 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#0F172A' },
  list: { padding: 16, paddingBottom: 40 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  villageCard: { flex: 0.485, borderWidth: 1, borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4 },
  vName: { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  vCount: { fontSize: 13, marginBottom: 8, opacity: 0.8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  vStatus: { fontSize: 13, fontWeight: '700' },
  legend: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 16, marginTop: 32, paddingHorizontal: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: 12, fontWeight: '700' },
  modalContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', backgroundColor: 'white' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  closeBtn: { fontSize: 16, color: '#0F172A', fontWeight: '700' }
});
