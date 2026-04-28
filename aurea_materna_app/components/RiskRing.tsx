import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

type Props = {
  score: number;
  status: 'green' | 'amber' | 'red';
};

export default function RiskRing({ score, status }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  let color = Colors.success;
  let bg = Colors.successLight;
  let emoji = '🌿';
  let label = 'Normal';

  if (status === 'amber') {
    color = Colors.warning;
    bg = Colors.warningLight;
    emoji = '⚠️';
    label = 'Watch';
  } else if (status === 'red') {
    color = Colors.danger;
    bg = Colors.dangerLight;
    emoji = '🚨';
    label = 'High Risk';
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ring, { borderColor: color, backgroundColor: bg }, animatedStyle]}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.score, { color }]}>{score}</Text>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </Animated.View>
      <Text style={styles.caption}>Placental Perfusion Risk Score · Updated 4 min ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  ring: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emoji: { fontSize: 32, marginBottom: 4 },
  score: { fontSize: 40, fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  caption: { fontSize: 12, color: Colors.textMuted },
});
