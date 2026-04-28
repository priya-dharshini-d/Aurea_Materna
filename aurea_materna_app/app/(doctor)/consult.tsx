import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function DoctorConsult() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Teleconsult Queue</Text>

        <View style={[styles.card, { backgroundColor: Colors.dangerLight, borderColor: Colors.danger, borderWidth: 1 }]}>
          <View style={styles.row}>
            <View style={[styles.avatar, { backgroundColor: Colors.danger }]}>
              <Text style={styles.avatarText}>LP</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>Lakshmi P. — URGENT</Text>
              <Text style={[styles.subtitle, { color: Colors.danger }]}>Requested 10 min ago · High BP</Text>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.danger }]}>
              <Text style={styles.btnText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.avatar, { backgroundColor: Colors.warningLight }]}>
              <Text style={[styles.avatarText, { color: Colors.warning }]}>GS</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>Gomathi S.</Text>
              <Text style={styles.subtitle}>Scheduled 2:00 PM · Diet query</Text>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.border }]}>
              <Text style={[styles.btnText, { color: Colors.textPrimary }]}>Prepare</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.offlineNote}>
          <Text style={styles.offlineTitle}>Works offline via SMS</Text>
          <Text style={styles.offlineText}>When internet unavailable, consultation summary auto-sent via encrypted SMS to ASHA.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 14, fontWeight: '700', color: 'white' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  subtitle: { fontSize: 11, color: Colors.textMuted },
  btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  btnText: { fontSize: 13, fontWeight: '600', color: 'white' },
  offlineNote: { backgroundColor: Colors.primaryLight, borderRadius: 16, padding: 16, marginTop: 8 },
  offlineTitle: { fontSize: 13, fontWeight: '600', color: Colors.primary, marginBottom: 4 },
  offlineText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 18 }
});
