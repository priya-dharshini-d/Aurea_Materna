import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ashaData } from '../../constants/MockData';
import AlertCard from '../../components/AlertCard';

export default function AshaHome() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Top Header matching Mother dashboard */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Home</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity 
              style={styles.topProfileBtn}
              onPress={() => router.push('/(asha)/alerts' as any)}
            >
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.topProfileBtn}
              onPress={() => router.push('/(asha)/profile' as any)}
            >
              <Ionicons name="person" size={24} color="#5269FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header - Blue Gradient matching screenshot */}
        <LinearGradient 
          colors={['#7E93FF', '#5269FF']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubtitle}>ASHA Worker</Text>
            </View>
          </View>
          <Text style={styles.heroQuote}>Never stop Learning, Because Life never stop Teaching</Text>
          <Text style={styles.heroPanchayat}>Panchayat {ashaData.panchayat} • {ashaData.totalMothers} Mothers</Text>
        </LinearGradient>

        {/* Categories for ASHA Stats */}
        <Text style={styles.sectionTitle}>Mothers Status</Text>
        <View style={styles.statsGrid}>
          
          <View style={styles.statItem}>
            <LinearGradient colors={['#9FA8DA', '#7986CB']} style={styles.statIconBox}>
              <Ionicons name="shield-checkmark" size={26} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statLabel}>Normal</Text>
            <Text style={styles.statNum}>{ashaData.greenCount}</Text>
          </View>

          <View style={styles.statItem}>
            <LinearGradient colors={['#FFD54F', '#FFB300']} style={styles.statIconBox}>
              <Ionicons name="warning" size={26} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statLabel}>Watch</Text>
            <Text style={styles.statNum}>{ashaData.amberCount}</Text>
          </View>

          <View style={styles.statItem}>
            <LinearGradient colors={['#FF8A80', '#FF5252']} style={styles.statIconBox}>
              <Ionicons name="medical" size={26} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statLabel}>High Risk</Text>
            <Text style={styles.statNum}>{ashaData.redCount}</Text>
          </View>

          <View style={styles.statItem}>
            <LinearGradient colors={['#CE93D8', '#AB47BC']} style={styles.statIconBox}>
              <Ionicons name="people" size={26} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statLabel}>All</Text>
            <Text style={styles.statNum}>{ashaData.totalMothers}</Text>
          </View>

        </View>



        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Today's Schedule</Text>
        <View style={[styles.listContainer, { padding: 20 }]}>
          {ashaData.schedule.map((item, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.timelineCol}>
                <View style={[
                  styles.timelineDot, 
                  item.status === 'done' ? { backgroundColor: '#4CAF50' } : 
                  item.status === 'current' ? { backgroundColor: '#FF5252' } : 
                  { backgroundColor: '#E0E0E0' }
                ]} />
                {idx < ashaData.schedule.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timeRow}>
                  <Text style={styles.timelineTime}>{item.time}</Text>
                  {item.status === 'done' && (
                    <View style={styles.statusBadgeDone}>
                      <Ionicons name="checkmark-circle" size={14} color="#4CAF50" style={{ marginRight: 4 }} />
                      <Text style={styles.statusTextDone}>Done</Text>
                    </View>
                  )}
                  {item.status === 'current' && (
                    <View style={styles.statusBadgeNow}>
                      <Ionicons name="time" size={14} color="#FF5252" style={{ marginRight: 4 }} />
                      <Text style={styles.statusTextNow}>Now</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.timelineTitle}>{item.title}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 20, paddingBottom: 60 },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, marginTop: 4 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  topProfileBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  heroCard: { 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 28,
    shadowColor: '#5269FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  heroSubtitle: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  heroQuote: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 20, marginBottom: 16, paddingRight: 40 },
  heroPanchayat: { color: '#FFF', fontSize: 13, fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#2D3142', marginBottom: 16, marginLeft: 4 },
  
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  statItem: { width: '22%', alignItems: 'center', marginBottom: 16 },
  statIconBox: { 
    width: 60, height: 60, borderRadius: 20, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 
  },
  statLabel: { fontSize: 12, color: '#9098B1', fontWeight: '600', marginBottom: 2 },
  statNum: { fontSize: 15, color: '#2D3142', fontWeight: '800' },

  listContainer: { backgroundColor: '#FFF', borderRadius: 24, padding: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },

  timelineItem: { flexDirection: 'row', minHeight: 65 },
  timelineCol: { alignItems: 'center', width: 20, marginRight: 16 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginTop: 4, borderWidth: 2, borderColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#F0F2F5', marginTop: 4 },
  timelineContent: { flex: 1, paddingBottom: 20 },
  timeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  timelineTime: { fontSize: 13, color: '#9098B1', fontWeight: '600' },
  statusBadgeDone: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusTextDone: { color: '#4CAF50', fontSize: 11, fontWeight: '700' },
  statusBadgeNow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEBEE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusTextNow: { color: '#FF5252', fontSize: 11, fontWeight: '700' },
  timelineTitle: { fontSize: 14, color: '#2D3142', fontWeight: '700', lineHeight: 20 }
});
