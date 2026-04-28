import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function DietPlan() {
  const router = useRouter();

  const meals = [
    { id: 1, title: 'Breakfast', time: '08:00 AM', items: 'Oatmeal with berries & nuts', calories: '350 kcal', icon: 'partly-sunny', color: '#FF9800' },
    { id: 2, title: 'Lunch', time: '01:00 PM', items: 'Grilled chicken salad with quinoa', calories: '450 kcal', icon: 'sunny', color: '#4CAF50' },
    { id: 3, title: 'Snack', time: '04:00 PM', items: 'Greek yogurt & an apple', calories: '150 kcal', icon: 'leaf', color: '#8BC34A' },
    { id: 4, title: 'Dinner', time: '07:30 PM', items: 'Baked salmon with roasted asparagus', calories: '500 kcal', icon: 'moon', color: '#3F51B5' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diet Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Daily Goal: 2200 kcal</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
          <Text style={styles.summaryText}>1450 kcal consumed • 750 kcal remaining</Text>
        </View>

        <Text style={styles.sectionTitle}>Today's Meals</Text>
        
        {meals.map(meal => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={[styles.iconBox, { backgroundColor: meal.color + '20' }]}>
              <Ionicons name={meal.icon as any} size={24} color={meal.color} />
            </View>
            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTitle}>{meal.title}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <Text style={styles.mealItems}>{meal.items}</Text>
              <Text style={styles.mealCalories}>{meal.calories}</Text>
            </View>
          </View>
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
  summaryCard: { backgroundColor: '#E8F5E9', padding: 20, borderRadius: 16, marginBottom: 24 },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: '#2E7D32', marginBottom: 16 },
  progressBarBg: { height: 8, backgroundColor: '#C8E6C9', borderRadius: 4, marginBottom: 12 },
  progressBarFill: { height: 8, backgroundColor: '#4CAF50', borderRadius: 4 },
  summaryText: { fontSize: 14, color: '#388E3C', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 16 },
  mealCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  mealInfo: { flex: 1 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  mealTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  mealTime: { fontSize: 12, color: '#999', fontWeight: '600' },
  mealItems: { fontSize: 14, color: '#666', marginBottom: 6 },
  mealCalories: { fontSize: 13, fontWeight: '700', color: Colors.primary }
});
