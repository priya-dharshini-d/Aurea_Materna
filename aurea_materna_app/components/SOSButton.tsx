import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type Props = {
  onPress: () => void;
};

export default function SOSButton({ onPress }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Alert.alert(
      "Send Emergency Alert?",
      "Alert will be sent to ASHA Meena Devi and PHC via SMS",
      [
        { text: "Cancel", style: "cancel" },
        { text: "SEND ALERT", style: "destructive", onPress }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ripple, animatedStyle]}>
        <TouchableOpacity style={styles.inner} onPress={handlePress} activeOpacity={0.8}>
          <Ionicons name="warning" size={32} color="white" style={styles.icon} />
          <Text style={styles.title}>EMERGENCY</Text>
          <Text style={styles.subtitle}>CALL FOR HELP</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.caption}>Alert sent via SMS if no internet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  ripple: {
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(162,45,45,0.12)',
    alignItems: 'center', justifyContent: 'center'
  },
  inner: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: Colors.danger,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.danger, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
  },
  icon: { marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '700', color: 'white' },
  subtitle: { fontSize: 11, color: 'white', opacity: 0.8, marginTop: 4 },
  caption: { fontSize: 12, color: Colors.textMuted, marginTop: 20 }
});
