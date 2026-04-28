import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  initials: string;
  name: string;
  week: number;
  pprs: number;
  status: 'green' | 'amber' | 'red';
  bp?: string;
  onPress?: () => void;
};

export default function MotherRow({ initials, name, week, pprs, status, bp, onPress }: Props) {
  let color = Colors.success;
  let bg = Colors.successLight;
  let label = 'Normal';

  if (status === 'amber') {
    color = Colors.warning;
    bg = Colors.warningLight;
    label = 'Watch';
  } else if (status === 'red') {
    color = Colors.danger;
    bg = Colors.dangerLight;
    label = 'High Risk';
  }

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper style={styles.row} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Text style={[styles.avatarText, { color }]}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>Week {week} · PPRS {pprs} {bp ? `· BP ${bp}` : ''}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color }]}>{label}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} style={{ marginLeft: 8 }} />}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 14, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  details: { fontSize: 12, color: Colors.textMuted },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: '600' }
});
