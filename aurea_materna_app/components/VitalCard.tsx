import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icon: string;
  value: string;
  unit: string;
  label: string;
  status?: 'green' | 'amber' | 'red';
};

export default function VitalCard({ icon, value, unit, label, status = 'green' }: Props) {
  let statusColor = Colors.success;
  if (status === 'amber') statusColor = Colors.warning;
  if (status === 'red') statusColor = Colors.danger;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={icon as any} size={22} color={Colors.primary} />
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    flex: 1,
    margin: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  value: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  unit: { fontSize: 13, color: Colors.textMuted, marginLeft: 2 },
  label: { fontSize: 12, color: Colors.textMuted },
});
