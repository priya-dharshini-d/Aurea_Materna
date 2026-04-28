import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AshaTraining() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.pageTitle}>Training & resources</Text>
          </View>
          <TouchableOpacity style={styles.trophyBtn}>
            <Ionicons name="trophy" size={22} color="#D97706" />
          </TouchableOpacity>
        </View>

        {/* In Progress */}
        <Text style={styles.sectionTitle}>In progress</Text>
        
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_abnormal.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Preeclampsia detection</Text>
            <Text style={styles.cardDesc}>Identify early signs, calculate PPRS score, and learn the critical escalation protocol.</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>65% · 2 lessons left</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_nutri.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Anaemia management</Text>
            <Text style={styles.cardDesc}>Best practices for the iron supplementation protocol and strategies for compliance.</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>40% · 3 lessons left</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Recommended for you */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Recommended for you</Text>

        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_childbirth.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Newborn care</Text>
            <Text style={styles.cardDesc}>Essential procedures for the first hour of life, breastfeeding initiation, and Kangaroo Mother Care.</Text>
            <View style={[styles.cardFooter, { marginTop: 16 }]}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>5 lessons · 45 min</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_life1.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Mental health</Text>
            <Text style={styles.cardDesc}>Depression screening methodologies and how to gently refer mothers for professional help.</Text>
            <View style={[styles.cardFooter, { marginTop: 16 }]}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>4 lessons · 30 min</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_life2.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Family planning</Text>
            <Text style={styles.cardDesc}>Spacing methods, counselling, and distributing contraceptives to eligible couples.</Text>
            <View style={[styles.cardFooter, { marginTop: 16 }]}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>3 lessons · 25 min</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Image source={require('../../assets/images/img_cond1.png')} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>HMIS data entry</Text>
            <Text style={styles.cardDesc}>RCH register management, timely reporting, and digital record keeping protocols.</Text>
            <View style={[styles.cardFooter, { marginTop: 16 }]}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.sessionText}>2 lessons · 20 min</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Certificates & References kept as clean lists */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Certificates earned</Text>
        <TouchableOpacity style={styles.listCard}>
          <View style={[styles.listIconBox, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="ribbon" size={24} color="#2E7D32" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>High-risk pregnancy management</Text>
            <Text style={styles.listSubtitle}>Issued 10 Mar 2026 · Valid 1 yr</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.badgeText, { color: '#2E7D32' }]}>Earned</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listCard}>
          <View style={[styles.listIconBox, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="ribbon" size={24} color="#1E3A8A" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Immunisation schedule & protocol</Text>
            <Text style={styles.listSubtitle}>Issued 5 Jan 2026 · Valid 1 yr</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EDE9FE' }]}>
            <Text style={[styles.badgeText, { color: '#5B21B6' }]}>Earned</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Reference materials</Text>
        <TouchableOpacity style={styles.listCard}>
          <View style={styles.refIconWrapper}>
            <Ionicons name="book" size={24} color="#475569" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>ASHA field guide 2025</Text>
            <Text style={styles.listSubtitle}>Ministry of Health · PDF · 4.2 MB · Offline</Text>
          </View>
          <Ionicons name="arrow-down" size={16} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listCard}>
          <View style={styles.refIconWrapper}>
            <Ionicons name="clipboard" size={24} color="#475569" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>PPRS scoring quick card</Text>
            <Text style={styles.listSubtitle}>Laminated reference · Always offline</Text>
          </View>
          <Ionicons name="arrow-down" size={16} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listCard}>
          <View style={styles.refIconWrapper}>
            <Ionicons name="medical" size={24} color="#475569" />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>UIP immunisation schedule</Text>
            <Text style={styles.listSubtitle}>Universal immunisation programme chart</Text>
          </View>
          <Ionicons name="arrow-down" size={16} color="#94A3B8" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 16, paddingBottom: 40 },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingBottom: 24, 
    paddingTop: 8 
  },
  headerTextContainer: { flex: 1 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#316A9E', marginTop: 4 },
  trophyBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 16, marginTop: 8 },
  
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    overflow: 'hidden'
  },
  cardImage: { width: '100%', height: 180, resizeMode: 'cover' },
  cardContent: { padding: 20 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#316A9E', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  
  progressTrack: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginTop: 16, marginBottom: 16 },
  progressFill: { height: '100%', backgroundColor: '#316A9E', borderRadius: 3 },
  
  cardFooter: { flexDirection: 'row', alignItems: 'center' },
  playBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  sessionText: { fontSize: 13, fontWeight: '600', color: '#94A3B8' },

  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  listIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  refIconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listContent: { flex: 1 },
  listTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  listSubtitle: { fontSize: 13, color: '#94A3B8' },
  
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});
