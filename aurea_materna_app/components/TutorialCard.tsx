import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

type Props = {
  thumb: string;
  title: string;
  format: string;
  duration: string;
  language: string;
  rating?: string;
  progress: number;
  onPress: () => void;
};

export default function TutorialCard({ thumb, title, format, duration, language, rating, progress, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.thumbBox}>
        <Text style={styles.thumbEmoji}>{thumb}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          {format} · {duration} · {language} {rating ? `· ⭐ ${rating}` : ''}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={[styles.status, progress === 100 && styles.statusComplete]}>
          {progress === 0 ? 'Not started' : progress === 100 ? 'Completed ✓' : `${progress}% complete`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    borderWidth: 1, borderColor: Colors.border,
  },
  thumbBox: {
    width: 56, height: 56, borderRadius: 12, backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: 14
  },
  thumbEmoji: { fontSize: 24 },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  meta: { fontSize: 11, color: Colors.textMuted, marginBottom: 8 },
  progressContainer: { height: 6, backgroundColor: Colors.bg, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressBar: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  status: { fontSize: 11, color: Colors.textMuted },
  statusComplete: { color: Colors.success, fontWeight: '600' }
});
