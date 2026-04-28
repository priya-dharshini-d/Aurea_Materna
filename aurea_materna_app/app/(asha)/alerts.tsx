import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AshaAlerts() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Alerts</Text>

        {/* Card 1: Critical */}
        <View style={[styles.card, { backgroundColor: '#FFF5F6', borderColor: 'rgba(225, 29, 72, 0.1)' }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTag, { color: '#DC2626' }]}>Critical</Text>
            <Text style={styles.cardTime}>3 hrs ago</Text>
          </View>
          <Text style={styles.cardTitle}>Lakshmi P. — Preeclampsia risk</Text>
          <Text style={styles.cardSubtitle}>BP 148/94 • PPRS 45 • Urine protein trace • Week 32</Text>
          
          <View style={styles.aiBox}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
            <Text style={styles.aiText}>Immediate PHC referral required. Mag sulphate protocol may be needed. Do NOT delay.</Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#FFE4E6' }]}>
              <Ionicons name="call" size={16} color="#E11D48" />
              <Text style={[styles.btnText, { color: '#E11D48', fontWeight: '700' }]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="business" size={16} color="#FCA5A5" />
              <Text style={[styles.btnText, { color: '#FCA5A5' }]}>Escalate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="checkmark" size={16} color="#FCA5A5" />
              <Text style={[styles.btnText, { color: '#FCA5A5' }]}>Resolve</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 2: Watch */}
        <View style={[styles.card, { backgroundColor: '#FFFDF0', borderColor: 'rgba(217, 119, 6, 0.15)' }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTag, { color: '#D97706' }]}>Watch</Text>
            <Text style={styles.cardTime}>6 hrs ago</Text>
          </View>
          <Text style={styles.cardTitle}>Gomathi S. — Non-compliance</Text>
          <Text style={styles.cardSubtitle}>Iron skipped 3 days • Hb 9.8 g/dL • Week 28</Text>
          
          <View style={styles.aiBox}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
            <Text style={styles.aiText}>Anaemia worsening. Home visit today. Check barriers to compliance and family support.</Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#FFE4E6' }]}>
              <Ionicons name="call" size={16} color="#E11D48" />
              <Text style={[styles.btnText, { color: '#E11D48', fontWeight: '700' }]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="calendar" size={16} color="#FCD34D" />
              <Text style={[styles.btnText, { color: '#FDE047' }]}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="checkmark" size={16} color="#FCD34D" />
              <Text style={[styles.btnText, { color: '#FDE047' }]}>Resolve</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 3: Reminder */}
        <View style={[styles.card, { backgroundColor: '#F4F9FF', borderColor: 'rgba(37, 99, 235, 0.15)' }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTag, { color: '#2563EB' }]}>Reminder</Text>
            <Text style={styles.cardTime}>Today</Text>
          </View>
          <Text style={styles.cardTitle}>Rathi K. — Vaccine due</Text>
          <Text style={styles.cardSubtitle}>6-wk infant • Pentavalent + OPV dose 2 • Window closes in 2 days</Text>
          
          <View style={styles.aiBox}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
            <Text style={styles.aiText}>Vaccination window closes soon. Confirm today's 2 PM visit.</Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="call" size={16} color="#BE185D" />
              <Text style={[styles.btnText, { color: '#BE185D', fontWeight: '700' }]}>Confirm visit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="checkmark" size={16} color="#BFDBFE" />
              <Text style={[styles.btnText, { color: '#BFDBFE' }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Escalation log */}
        <Text style={styles.sectionTitle}>Escalation log</Text>
        <View style={styles.logContainer}>
          <View style={styles.logItem}>
            <View style={styles.dot} />
            <View style={styles.logContent}>
              <Text style={styles.logTitle}>Kavitha M. — Resolved 22 Apr</Text>
              <Text style={styles.logDesc}>PHC referral accepted. Delivered safely. Mother & baby well.</Text>
            </View>
          </View>
          <View style={[styles.logItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.dot} />
            <View style={styles.logContent}>
              <Text style={styles.logTitle}>Subbulakshmi — Resolved 14 Apr</Text>
              <Text style={styles.logDesc}>Hb 8.2. Managed with IV iron at PHC. Discharged after 2 days.</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5F7' },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 20, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginTop: 16, marginBottom: 12 },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    paddingLeft: 20,
    marginBottom: 16,
    position: 'relative',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTag: { fontSize: 12, fontWeight: '800' },
  cardTime: { fontSize: 12, color: '#94A3B8' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#475569', marginBottom: 16 },

  aiBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aiBadge: {
    backgroundColor: '#F0F4FF',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    marginTop: 2,
  },
  aiBadgeText: { fontSize: 10, fontWeight: '800', color: '#4F46E5' },
  aiText: { fontSize: 13, color: '#0F172A', flex: 1, lineHeight: 18 },

  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },

  logContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 16,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    marginTop: 6,
    marginRight: 12,
  },
  logContent: { flex: 1 },
  logTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  logDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
});
