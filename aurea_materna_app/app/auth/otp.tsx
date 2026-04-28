import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function OTP() {
  const router = useRouter();
  const { data } = useLocalSearchParams<{ data: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<any>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== '123456') {
      alert("Invalid OTP. Please enter 123456 for the demo.");
      return;
    }

    setLoading(true);
    try {
      const regData = JSON.parse(data);
      
      // DEMO MODE: Generate a random UUID for the user
      const userId = '00000000-0000-4000-8000-' + Math.floor(Math.random() * 1000000000000).toString(16).padStart(12, '0');

      const isPendingRole = regData.role === 'asha' || regData.role === 'doctor';

      if (isPendingRole) {
        // 1. SAVE TO TEMPORARY TABLE (pending_approvals)
        const { error: pendingError } = await supabase
          .from('pending_approvals')
          .insert([{
            full_name: regData.fullName,
            phone_number: regData.phone,
            email: regData.email,
            password: regData.password,
            role: regData.role,
            location_village: regData.village,
            location_district: regData.district,
            role_details: regData.roleDetails
          }]);

        if (pendingError) throw pendingError;
      } else {
        // 2. SAVE TO MAIN TABLE (profiles) - Mothers & Admins
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            full_name: regData.fullName,
            phone_number: regData.phone,
            email: regData.email,
            password: regData.password,
            role: regData.role,
            location_village: regData.village,
            location_district: regData.district,
            verification_status: 'verified',
            is_verified: true
          }]);

        if (profileError) throw profileError;

        // 3. Save Role Specific Details for Mothers
        if (regData.role === 'mother') {
          await supabase.from('mother_details').insert([{
            profile_id: userId,
            age: parseInt(regData.roleDetails.age) || 20,
            gestation_week: parseInt(regData.roleDetails.week) || 12,
            blood_group: regData.roleDetails.bloodGroup || 'O+',
          }]);
        }
      }

      // 4. Navigate to Status Page with the result
      router.push({
        pathname: '/auth/status',
        params: { pending: isPendingRole ? 'true' : 'false' }
      });
    } catch (err: any) {
      alert("Database Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Verify Account</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.verifyBtn, loading && styles.disabledBtn]} 
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={styles.verifyBtnText}>{loading ? 'Saving to Database...' : 'Verify & Proceed'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn}>
          <Text style={styles.resendText}>Didn't receive a code? <Text style={styles.resendLink}>Resend</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, flexGrow: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 20, elevation: 1 },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  otpInput: { width: 48, height: 56, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#0F172A' },
  verifyBtn: { backgroundColor: '#0F172A', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  verifyBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  disabledBtn: { backgroundColor: '#94A3B8' },
  resendBtn: { alignItems: 'center' },
  resendText: { fontSize: 14, color: '#64748B' },
  resendLink: { color: '#0F6E56', fontWeight: '700' },
});
