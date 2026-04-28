import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function BabyGrowth() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Baby Growth</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroSection}>
          <View style={styles.weekBadge}>
            <Text style={styles.weekText}>Week 24</Text>
          </View>
          <Text style={styles.comparisonText}>Your baby is the size of an</Text>
          <Text style={styles.fruitText}>Ear of Corn</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="resize" size={24} color={Colors.primary} />
              <Text style={styles.statVal}>30 cm</Text>
              <Text style={styles.statLabel}>Length</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="scale" size={24} color={Colors.primary} />
              <Text style={styles.statVal}>600 g</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>What's happening this week?</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Your baby's brain is growing rapidly! Taste buds are forming, and the lungs are developing "branches" of the respiratory tree. You might even start feeling more distinct kicks and punches.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF' },
  backBtn: { padding: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  scroll: { padding: 16 },
  heroSection: { backgroundColor: '#FCE4EC', padding: 24, borderRadius: 20, alignItems: 'center', marginBottom: 24 },
  weekBadge: { backgroundColor: '#E91E63', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  weekText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  comparisonText: { fontSize: 16, color: '#D81B60', marginBottom: 4 },
  fruitText: { fontSize: 32, fontWeight: '800', color: '#C2185B', marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 16 },
  statBox: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, alignItems: 'center', minWidth: 100 },
  statVal: { fontSize: 18, fontWeight: '700', color: '#333', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 16 },
  infoCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  infoText: { fontSize: 15, lineHeight: 24, color: '#444' }
});
