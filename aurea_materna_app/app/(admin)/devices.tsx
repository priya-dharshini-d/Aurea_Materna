import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { adminData } from '../../constants/MockData';
import StatCard from '../../components/StatCard';

export default function AdminDevices() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Device Fleet Management</Text>
      </View>

      <FlatList
        data={adminData.devices}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.statRow}>
            <StatCard number="1,089" label="Active patches" />
            <StatCard number="158" label="Low battery" color={Colors.warning} />
          </View>
        }
        renderItem={({ item }) => {
          let statusColor = Colors.success;
          if (item.status === 'Low bat.') statusColor = Colors.warning;
          if (item.status === 'Maintenance') statusColor = Colors.danger;

          return (
            <View style={styles.deviceCard}>
              <View style={styles.iconBox}>
                <Text style={styles.icon}>📟</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>Patch #{item.id} · {item.location}</Text>
                <Text style={styles.sub}>Battery {item.battery}% · Signal {item.signal} · Sync {item.lastSync}</Text>
              </View>
              <Text style={[styles.status, { color: statusColor }]}>{item.status}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 16, paddingBottom: 8 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  list: { padding: 16, paddingBottom: 40 },
  statRow: { flexDirection: 'row', marginBottom: 16 },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  sub: { fontSize: 11, color: Colors.textMuted },
  status: { fontSize: 11, fontWeight: '700' }
});
