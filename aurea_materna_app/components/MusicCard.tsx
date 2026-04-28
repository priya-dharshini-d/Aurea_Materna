import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type Props = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  isPlaying: boolean;
  onPress: () => void;
};

export default function MusicCard({ icon, title, subtitle, isPlaying, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.emoji}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      
      <TouchableOpacity style={styles.playBtn} onPress={onPress}>
        {isPlaying ? (
          <View style={styles.playingIndicator}>
            <AnimatedBar delay={0} />
            <AnimatedBar delay={150} />
            <AnimatedBar delay={300} />
          </View>
        ) : (
          <Ionicons name="play" size={16} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

function AnimatedBar({ delay }: { delay: number }) {
  const height = useSharedValue(4);

  React.useEffect(() => {
    setTimeout(() => {
      height.value = withRepeat(
        withSequence(
          withTiming(16, { duration: 400 }),
          withTiming(4, { duration: 400 })
        ),
        -1,
        true
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return <Animated.View style={[styles.bar, animatedStyle]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.purpleLight,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: Colors.purple,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14
  },
  emoji: { fontSize: 24, color: 'white' },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.purple, marginBottom: 2 },
  subtitle: { fontSize: 12, color: Colors.purple, opacity: 0.8 },
  playBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.purple,
    alignItems: 'center', justifyContent: 'center',
  },
  playingIndicator: { flexDirection: 'row', alignItems: 'flex-end', height: 16, gap: 2 },
  bar: { width: 3, backgroundColor: 'white', borderRadius: 2 }
});
