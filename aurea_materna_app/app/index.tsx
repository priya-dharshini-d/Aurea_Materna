import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useRole } from './_layout';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelector() {
  const router = useRouter();
  const { setRole } = useRole();

  const selectRole = (role: 'mother' | 'asha' | 'doctor' | 'admin', path: string) => {
    setRole(role);
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Aurea Materna</Text>
          <Text style={styles.tagline}>Predict. Prevent. Protect.</Text>
        </View>

        <View style={styles.cards}>
          <RoleCard 
            icon="woman-outline" 
            title="Mother" 
            desc="I am an expecting mother" 
            onPress={() => selectRole('mother', '/(mother)/connect')} 
          />
          <RoleCard 
            icon="medkit-outline" 
            title="ASHA" 
            desc="I am an ASHA health worker" 
            onPress={() => selectRole('asha', '/(asha)')} 
          />
          <RoleCard 
            icon="medical-outline" 
            title="Doctor" 
            desc="I am a PHC doctor" 
            onPress={() => selectRole('doctor', '/(doctor)')} 
          />
          <RoleCard 
            icon="business-outline" 
            title="Admin" 
            desc="I am a government administrator" 
            onPress={() => selectRole('admin', '/(admin)')} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RoleCard({ icon, title, desc, onPress }: { icon: string, title: string, desc: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name={icon as any} size={32} color={Colors.primary} style={{ marginRight: 16 }} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flexGrow: 1, padding: 16, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '700', color: Colors.primary, marginBottom: 8 },
  tagline: { fontSize: 16, fontStyle: 'italic', color: Colors.textMuted },
  cards: { width: '100%' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: Colors.textMuted },
});
