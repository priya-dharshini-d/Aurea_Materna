import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type ChipProps = {
  label: string;
  status: 'Active' | 'Weak' | 'Offline';
};

export default function ConnectivityBar({ label, status }: ChipProps) {
  let color = Colors.success;
  let bg = Colors.successLight;

  if (status === 'Weak') {
    color = Colors.warning;
    bg = Colors.warningLight;
  } else if (status === 'Offline') {
    color = Colors.textMuted;
    bg = Colors.bg;
  }

  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={[styles.status, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    marginRight: 8,
    marginBottom: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  label: { fontSize: 12, fontWeight: '600', marginRight: 4 },
  status: { fontSize: 11, opacity: 0.8 }
});
