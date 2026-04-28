import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Reports() {
  const router = useRouter();

  const reports = [
    { id: 1, title: 'First Trimester Blood Test', date: '12 Jan 2026', doctor: 'Dr. Sarah Smith', status: 'Normal', icon: 'water' },
    { id: 2, title: 'Anatomy Scan Ultrasound', date: '28 Feb 2026', doctor: 'Dr. Alan Grant', status: 'Reviewing', icon: 'scan' },
    { id: 3, title: 'Glucose Screening Test', date: '15 Apr 2026', doctor: 'Dr. Sarah Smith', status: 'Pending', icon: 'flask' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Reports</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {reports.map(rep => (
          <TouchableOpacity key={rep.id} style={styles.card} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <Ionicons name={rep.icon as any} size={24} color={Colors.primary} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{rep.title}</Text>
              <Text style={styles.cardSub}>{rep.date} • {rep.doctor}</Text>
            </View>
            <View style={[styles.statusBadge, 
              rep.status === 'Normal' ? styles.statusNormal : 
              rep.status === 'Reviewing' ? styles.statusReview : styles.statusPending
            ]}>
              <Text style={[styles.statusText, 
                rep.status === 'Normal' ? styles.textNormal : 
                rep.status === 'Reviewing' ? styles.textReview : styles.textPending
              ]}>{rep.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.uploadBtn}>
          <Ionicons name="cloud-upload-outline" size={24} color={Colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.uploadBtnText}>Upload New Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF' },
  backBtn: { padding: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  scroll: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F0F4F8', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#888' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusNormal: { backgroundColor: '#E8F5E9' },
  statusReview: { backgroundColor: '#FFF3E0' },
  statusPending: { backgroundColor: '#F5F5F5' },
  statusText: { fontSize: 11, fontWeight: '700' },
  textNormal: { color: '#2E7D32' },
  textReview: { color: '#F57C00' },
  textPending: { color: '#757575' },
  uploadBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderWidth: 2, borderColor: '#E3F2FD', borderStyle: 'dashed', borderRadius: 16, marginTop: 12, backgroundColor: '#FAFDFF' },
  uploadBtnText: { fontSize: 16, fontWeight: '600', color: Colors.primary }
});
