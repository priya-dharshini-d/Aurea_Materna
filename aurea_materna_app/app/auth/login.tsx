import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Please enter both mobile number and password.");
      return;
    }

    setLoading(true);
    try {
      // Query profiles table for the phone and password
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone_number', phone)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error("Invalid mobile number or password.");
      }

      // Successful Login
      // Redirect based on role
      const role = data.role;
      if (role === 'mother') router.push('/(mother)');
      else if (role === 'asha') router.push('/(asha)');
      else if (role === 'doctor') router.push('/(doctor)');
      else if (role === 'admin') router.push('/(admin)');
      
    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
    } finally {
      setLoading(false);
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to your Aurea Materna account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#64748B" style={{ marginRight: 10 }} />
                <TextInput 
                  style={styles.input} 
                  value={phone} 
                  onChangeText={setPhone} 
                  placeholder="+91 00000 00000" 
                  keyboardType="phone-pad"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={{ marginRight: 10 }} />
                <TextInput 
                  style={styles.input} 
                  value={password} 
                  onChangeText={setPassword} 
                  placeholder="••••••••" 
                  secureTextEntry 
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.primaryBtn, loading && styles.disabledBtn]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>{loading ? 'Logging in...' : 'Log In'}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 32, elevation: 1, position: 'absolute', top: 24, left: 24, zIndex: 10 },
  header: { marginBottom: 40, marginTop: 40 },
  title: { fontSize: 32, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748B', lineHeight: 24 },
  form: { marginBottom: 32 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { flex: 1, fontSize: 15, color: '#0F172A' },
  forgotBtn: { alignSelf: 'flex-end' },
  forgotText: { color: '#0F6E56', fontWeight: '700', fontSize: 14 },
  primaryBtn: { backgroundColor: '#0F172A', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  disabledBtn: { backgroundColor: '#94A3B8' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { fontSize: 15, color: '#64748B' },
  footerLink: { fontSize: 15, color: '#0F6E56', fontWeight: '800' }
});
