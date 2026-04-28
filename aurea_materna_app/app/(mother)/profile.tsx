import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useRole } from '../_layout';

export default function MotherProfile() {
  const router = useRouter();
  const { setRole } = useRole();
  const [name, setName] = useState("Priya Sharma");
  const [mobile, setMobile] = useState("+91 98765 43210");
  
  // Settings state
  const [dailySummary, setDailySummary] = useState(true);
  const [emergencyAuto, setEmergencyAuto] = useState(true);
  const [redAlertCalls, setRedAlertCalls] = useState(true);
  const [apptReminder, setApptReminder] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={Colors.primary} />
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={14} color="white" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput 
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        {/* Family Connect Section (matching screenshot) */}
        <View style={styles.familyConnectSection}>
          <Text style={styles.sectionTitle}>Family Connect</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Linked Family Members</Text>
            
            <View style={styles.familyRow}>
              <View style={[styles.famAvatar, { backgroundColor: '#E1F5EE' }]}>
                <Ionicons name="person" size={20} color={Colors.teal} />
              </View>
              <View style={styles.famInfo}>
                <Text style={styles.famName}>Ravi Kumar (Husband)</Text>
                <Text style={styles.famSub}>Gets daily summary alerts</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            </View>
            
            <View style={[styles.familyRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.famAvatar, { backgroundColor: '#FAEEDA' }]}>
                <Ionicons name="person" size={20} color={Colors.warning} />
              </View>
              <View style={styles.famInfo}>
                <Text style={styles.famName}>Kamala (Mother-in-law)</Text>
                <Text style={styles.famSub}>Emergency alerts only</Text>
              </View>
              <View style={styles.activePill}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Alert Preferences</Text>
            
            <PrefRow label="Daily health summary" value={dailySummary} onValueChange={setDailySummary} />
            <PrefRow label="Emergency alerts (auto)" value={emergencyAuto} onValueChange={setEmergencyAuto} />
            <PrefRow label="Red alert calls" value={redAlertCalls} onValueChange={setRedAlertCalls} />
            <PrefRow label="Doctor appointment reminder" value={apptReminder} onValueChange={setApptReminder} isLast />
          </View>

          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add family member</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={() => {
              setRole(null);
              router.replace('/auth/login');
            }}
          >
            <Text style={styles.logoutBtnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PrefRow({ label, value, onValueChange, isLast }: any) {
  return (
    <View style={[styles.prefRow, !isLast && styles.borderBottom]}>
      <Text style={styles.prefLabel}>{label}</Text>
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg }, // Light theme
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scroll: { padding: 16, paddingBottom: 40 },
  
  profileSection: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { position: 'relative', marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.primary, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.bg },
  inputGroup: { width: '100%', marginBottom: 16 },
  label: { fontSize: 13, color: Colors.textMuted, marginBottom: 6 },
  input: { backgroundColor: 'white', color: Colors.textPrimary, borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: Colors.border },

  familyConnectSection: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardHeader: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  
  familyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  famAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  famInfo: { flex: 1 },
  famName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  famSub: { fontSize: 12, color: Colors.textMuted },
  activePill: { backgroundColor: Colors.successLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  activeText: { color: Colors.success, fontSize: 12, fontWeight: '700' },
  
  prefRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  prefLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  
  addBtn: { width: '100%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, backgroundColor: 'white', alignItems: 'center', marginTop: 8 },
  addBtnText: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600' },
  
  logoutBtn: { width: '100%', padding: 16, borderRadius: 12, backgroundColor: Colors.dangerLight, alignItems: 'center', marginTop: 24, borderWidth: 1, borderColor: Colors.danger },
  logoutBtnText: { color: Colors.danger, fontSize: 15, fontWeight: '700' }
});
