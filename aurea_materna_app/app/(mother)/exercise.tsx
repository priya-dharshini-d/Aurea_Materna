import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function ExercisePlan() {
  const router = useRouter();

  const routines = [
    { id: 1, title: 'Prenatal Yoga', duration: '20 Min', level: 'Beginner', icon: 'body', color: '#E91E63' },
    { id: 2, title: 'Brisk Walking', duration: '30 Min', level: 'All Levels', icon: 'walk', color: '#4CAF50' },
    { id: 3, title: 'Pelvic Floor Exercises', duration: '10 Min', level: 'Important', icon: 'fitness', color: '#9C27B0' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroCard}>
          <Ionicons name="heart-circle" size={48} color="#FFF" style={{ marginBottom: 12 }} />
          <Text style={styles.heroTitle}>Keep Moving, Priya!</Text>
          <Text style={styles.heroSub}>30 minutes of daily exercise helps prepare your body for childbirth.</Text>
        </View>

        <Text style={styles.sectionTitle}>Recommended Routines</Text>
        
        {routines.map(item => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.duration} • {item.level}</Text>
            </View>
            <Ionicons name="play-circle" size={36} color={Colors.primary} />
          </TouchableOpacity>
        ))}
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
  heroCard: { backgroundColor: '#2196F3', padding: 24, borderRadius: 16, marginBottom: 24, alignItems: 'flex-start' },
  heroTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  heroSub: { fontSize: 14, color: '#E3F2FD', lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  iconBox: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#666', fontWeight: '500' }
});
