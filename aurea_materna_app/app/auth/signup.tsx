import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';

export default function Signup() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  // Common Details
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    village: '',
    district: '',
    state: '',
  });

  // Role Specific Details
  const [motherDetails, setMotherDetails] = useState({ age: '', week: '', edd: '', bloodGroup: '' });
  const [ashaDetails, setAshaDetails] = useState({ govId: '', ashaId: '', phc: '' });
  const [doctorDetails, setDoctorDetails] = useState({ regNo: '', hospital: '', spec: '', exp: '' });

  const isStep1Valid = formData.fullName && formData.phone && formData.email && formData.password && formData.village && formData.district;

  const handleNext = async () => {
    if (step === 1) {
      if (isStep1Valid) setStep(2);
    } else {
      setLoading(true);
      try {
        // Pass data to OTP screen
        const registrationData = {
          ...formData,
          role,
          roleDetails: role === 'mother' ? motherDetails : role === 'asha' ? ashaDetails : doctorDetails
        };
        
        router.push({
          pathname: '/auth/otp',
          params: { data: JSON.stringify(registrationData) }
        });
      } catch (err: any) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Complete Registration</Text>
            <Text style={styles.subtitle}>Step {step} of 2: {step === 1 ? 'Basic Details' : 'Role Specifics'}</Text>
          </View>

          {step === 1 ? (
            <View style={styles.form}>
              <Input label="Full Name" value={formData.fullName} onChange={(v) => setFormData({...formData, fullName: v})} icon="person-outline" placeholder="Enter your full name" />
              <Input label="Phone Number" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} icon="call-outline" placeholder="+91 00000 00000" keyboardType="phone-pad" />
              <Input label="Email Address" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} icon="mail-outline" placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" />
              <Input label="Password" value={formData.password} onChange={(v) => setFormData({...formData, password: v})} icon="lock-closed-outline" placeholder="Create a password" secureTextEntry />
              
              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Input label="Village" value={formData.village} onChange={(v) => setFormData({...formData, village: v})} placeholder="Village" />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Input label="District" value={formData.district} onChange={(v) => setFormData({...formData, district: v})} placeholder="District" />
                </View>
              </View>
              {!isStep1Valid && <Text style={styles.validationText}>* Please fill all required fields to proceed</Text>}
            </View>
          ) : (
            <View style={styles.form}>
              {role === 'mother' && (
                <>
                  <Input label="Age" value={motherDetails.age} onChange={(v) => setMotherDetails({...motherDetails, age: v})} placeholder="e.g. 25" keyboardType="numeric" />
                  <Input label="Gestation Week" value={motherDetails.week} onChange={(v) => setMotherDetails({...motherDetails, week: v})} placeholder="e.g. 12" keyboardType="numeric" />
                  <Input label="Blood Group" value={motherDetails.bloodGroup} onChange={(v) => setMotherDetails({...motherDetails, bloodGroup: v})} placeholder="e.g. O+" />
                  
                  {formData.village ? (
                    <View style={styles.ashaDetectionBox}>
                      <View style={styles.ashaInfo}>
                        <Ionicons name="location" size={18} color="#0F6E56" />
                        <Text style={styles.ashaText}>
                          Nearest ASHA Worker Detected: <Text style={{ fontWeight: '800' }}>Meena Devi ({formData.village} PHC)</Text>
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.qrBtn}>
                        <Ionicons name="qr-code" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.ashaSearchBox}>
                      <Ionicons name="search" size={18} color="#64748B" />
                      <Text style={styles.ashaSearchText}>Enter village in Step 1 to find ASHA</Text>
                    </View>
                  )}
                  <Text style={styles.trustMessageSmall}>Pre-linked via health worker network mapping</Text>
                </>
              )}

              {role === 'asha' && (
                <>
                  <Input label="Government ID" value={ashaDetails.govId} onChange={(v) => setAshaDetails({...ashaDetails, govId: v})} placeholder="Enter ID Number" />
                  <Input label="ASHA ID Number" value={ashaDetails.ashaId} onChange={(v) => setAshaDetails({...ashaDetails, ashaId: v})} placeholder="ASHA-12345" />
                  <Input label="PHC Name" value={ashaDetails.phc} onChange={(v) => setAshaDetails({...ashaDetails, phc: v})} placeholder="Primary Health Center" />
                </>
              )}

              {role === 'doctor' && (
                <>
                  <Input label="Medical Reg Number" value={doctorDetails.regNo} onChange={(v) => setDoctorDetails({...doctorDetails, regNo: v})} placeholder="Reg-XXXX-XXXX" />
                  <Input label="Hospital / PHC Name" value={doctorDetails.hospital} onChange={(v) => setDoctorDetails({...doctorDetails, hospital: v})} placeholder="Name of Hospital" />
                  <Input label="Specialization" value={doctorDetails.spec} onChange={(v) => setDoctorDetails({...doctorDetails, spec: v})} placeholder="e.g. OB-GYN" />
                </>
              )}

              <View style={styles.consentContainer}>
                <Switch value={agree} onValueChange={setAgree} trackColor={{ false: '#CBD5E1', true: '#0F6E56' }} />
                <Text style={styles.consentText}>I agree to share health data securely</Text>
              </View>

              <View style={styles.trustBox}>
                <Ionicons name="shield-checkmark" size={20} color="#0F6E56" />
                <Text style={styles.trustText}>Your data is secure and used only for healthcare purposes</Text>
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={[
              styles.primaryBtn, 
              ((step === 1 && !isStep1Valid) || (step === 2 && !agree) || loading) && styles.disabledBtn
            ]} 
            onPress={handleNext}
            disabled={(step === 1 && !isStep1Valid) || (step === 2 && !agree) || loading}
          >
            <Text style={styles.primaryBtnText}>{loading ? 'Sending Email...' : (step === 1 ? 'Next' : 'Verify via OTP')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Input({ label, value, onChange, icon, ...props }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon && <Ionicons name={icon} size={20} color="#64748B" style={{ marginRight: 10 }} />}
        <TextInput 
          style={styles.input} 
          value={value} 
          onChangeText={onChange} 
          placeholderTextColor="#94A3B8"
          {...props} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, paddingBottom: 60 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 24, elevation: 1 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748B', fontWeight: '600' },
  form: { marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { flex: 1, fontSize: 15, color: '#0F172A' },
  row: { flexDirection: 'row' },
  consentContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 20 },
  consentText: { fontSize: 14, color: '#475569', marginLeft: 12 },
  trustBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDFA', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#CCFBF1' },
  trustText: { fontSize: 13, color: '#0F766E', marginLeft: 10, flex: 1, lineHeight: 18 },
  primaryBtn: { backgroundColor: '#0F172A', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  disabledBtn: { backgroundColor: '#94A3B8' },
  ashaDetectionBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDFA', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#CCFBF1', marginTop: 8 },
  ashaSearchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 8 },
  ashaSearchText: { fontSize: 13, color: '#64748B', marginLeft: 8 },
  ashaInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  ashaText: { fontSize: 13, color: '#0F766E', marginLeft: 8, flex: 1 },
  qrBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#0F6E56', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  trustMessageSmall: { fontSize: 11, color: '#64748B', marginTop: 4, fontStyle: 'italic' },
  validationText: { fontSize: 12, color: '#EF4444', fontWeight: '600', marginTop: 4 }
});
