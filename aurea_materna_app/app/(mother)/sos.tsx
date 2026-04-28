import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import SOSButton from '../../components/SOSButton';

const warningSigns = [
  { id: 1, title: 'Severe headache', desc: 'Or blurred vision / spots', icon: 'eye-off' },
  { id: 2, title: 'Heavy bleeding', desc: 'Vaginal bleeding or spotting', icon: 'water' },
  { id: 3, title: 'Decreased movement', desc: 'Baby not moving for 12 hours', icon: 'body' },
  { id: 4, title: 'Severe swelling', desc: 'Sudden swelling of face/hands', icon: 'alert-circle' },
  { id: 5, title: 'Fluid leaking', desc: 'Water breaking early', icon: 'water' },
  { id: 6, title: 'Severe pain', desc: 'Persistent abdominal cramping', icon: 'medical' },
  { id: 7, title: 'Persistent vomiting', desc: 'Unable to keep fluids down', icon: 'warning' },
  { id: 8, title: 'Fever or chills', desc: 'Temperature above 38°C', icon: 'thermometer' },
  { id: 9, title: 'Painful urination', desc: 'Burning sensation when urinating', icon: 'water' },
  { id: 10, title: 'Shortness of breath', desc: 'Dizziness or difficulty breathing', icon: 'pulse' },
];

export default function MotherSOS() {
  const handleSOS = () => {
    // SOS alert handled in component
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Emergency SOS</Text>
        </View>
        <Text style={styles.prompt}>Press if you feel unwell</Text>
        
        <SOSButton onPress={handleSOS} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency contacts</Text>
          
          <ContactRow icon="medkit" name="Meena Devi (ASHA)" role="Nearest health worker" color={Colors.success} bg={Colors.successLight} isOutline />
          <ContactRow icon="business" name="PHC Coimbatore" role="8 km away" color={Colors.primary} bg={Colors.primaryLight} isOutline />
          <ContactRow icon="person" name="Ravi (Husband)" role="Family contact" color={Colors.teal} bg={Colors.tealLight} isOutline isLast />
        </View>

        <View style={{ width: '100%', marginTop: 8 }}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Seek help immediately if:</Text>
          <View style={styles.warningGrid}>
            {warningSigns.map(sign => (
              <View key={sign.id} style={styles.warningItemCard}>
                <View style={styles.warningIconBg}>
                  <Ionicons name={sign.icon as any} size={20} color={Colors.warning} />
                </View>
                <Text style={styles.warningItemTitle}>{sign.title}</Text>
                <Text style={styles.warningItemDesc}>{sign.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ContactRow({ icon, name, role, color, bg, isOutline, isLast }: any) {
  const handleCall = () => Linking.openURL('tel:911');

  return (
    <View style={[styles.contactRow, !isLast && styles.borderBottom]}>
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactRole}>{role}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.callBtn, isOutline ? { borderWidth: 1, borderColor: Colors.border, backgroundColor: 'transparent' } : { backgroundColor: Colors.primary }]}
        onPress={handleCall}
      >
        <Text style={[styles.callBtnText, isOutline ? { color: Colors.textPrimary } : { color: 'white' }]}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { padding: 16, paddingTop: 4, paddingBottom: 40, alignItems: 'center' },
  header: { 
    alignSelf: 'flex-start',
    paddingTop: 16,
    paddingBottom: 24
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A4D6E',
    lineHeight: 32
  },
  prompt: { fontSize: 14, color: Colors.textMuted },
  card: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarIcon: { fontSize: 20 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  contactRole: { fontSize: 12, color: Colors.textMuted },
  callBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  callBtnText: { fontSize: 13, fontWeight: '600' },
  warningGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  warningItemCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  warningIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.warningLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  warningItemTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  warningItemDesc: { fontSize: 12, color: Colors.textMuted, lineHeight: 16 }
});
