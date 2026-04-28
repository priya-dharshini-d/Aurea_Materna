import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type Props = {
  number: string | number;
  label: string;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
  color?: string;
};

export default function StatCard({ number, label, delta, deltaType, color = Colors.textPrimary }: Props) {
  let deltaColor = Colors.textMuted;
  if (deltaType === 'up') deltaColor = Colors.success;
  if (deltaType === 'down') deltaColor = Colors.danger;

  return (
    <View style={styles.card}>
      <Text style={[styles.number, { color }]}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
      {delta && <Text style={[styles.delta, { color: deltaColor }]}>{delta}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    borderWidth: 1, borderColor: Colors.border,
  },
  number: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  label: { fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
  delta: { fontSize: 11, fontWeight: '600', marginTop: 8 }
});
