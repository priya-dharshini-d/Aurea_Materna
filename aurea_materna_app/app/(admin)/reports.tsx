import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { adminData } from '../../constants/MockData';

export default function AdminReports() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Monthly Reports</Text>
      </View>

      <FlatList
        data={adminData.reports}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <Text style={styles.icon}>{item.type === 'PDF' ? '📄' : item.type === 'XLSX' ? '📊' : '🗺️'}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc} · {item.type}</Text>
            </View>
            <TouchableOpacity style={styles.exportBtn}>
              <Text style={styles.exportBtnText}>Export</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 16, paddingBottom: 8 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  list: { padding: 16, paddingBottom: 40 },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  icon: { fontSize: 32, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  desc: { fontSize: 12, color: Colors.textMuted },
  exportBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: Colors.border },
  exportBtnText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary }
});
