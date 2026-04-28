import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

type Props = {
  currentWeek: number;
  totalWeeks?: number;
};

export default function WeekTracker({ currentWeek, totalWeeks = 40 }: Props) {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  const relevantWeeks = [1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {relevantWeeks.map(week => {
          let bg = 'white';
          let border = Colors.border;
          let textCol = Colors.textMuted;

          if (week < currentWeek) {
            bg = Colors.primary;
            border = Colors.primary;
            textCol = 'white';
          } else if (week === currentWeek) {
            bg = Colors.primaryLight;
            border = Colors.primary;
            textCol = Colors.primary;
          }

          return (
            <View key={week} style={[styles.dot, { backgroundColor: bg, borderColor: border }]}>
              <Text style={[styles.text, { color: textCol }]}>{week}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.progBg}>
        <View style={[styles.progFill, { width: `${(currentWeek / totalWeeks) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 12 },
  scroll: { gap: 6, paddingBottom: 8 },
  dot: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 13, fontWeight: '600' },
  progBg: { height: 6, backgroundColor: Colors.bg, borderRadius: 3, marginTop: 4 },
  progFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 }
});
