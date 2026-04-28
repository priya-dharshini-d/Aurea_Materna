import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useRole } from './_layout';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelector() {
  const router = useRouter();
  const { setRole } = useRole();

  const selectRole = (role: 'mother' | 'asha' | 'doctor' | 'admin') => {
    setRole(role);
    router.push({ pathname: '/auth/signup', params: { role } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Role</Text>
          <Text style={styles.subtitle}>Create Your Account</Text>
        </View>

        <View style={styles.cards}>
          <RoleCard 
            image={require('../assets/images/ani_mother.png')}
            icon="heart-outline" 
            title="Mother" 
            desc="Personalized clinical guidance and health tracking for your journey." 
            onPress={() => selectRole('mother')} 
          />
          <RoleCard 
            image={require('../assets/images/ani_asha.png')}
            icon="people-outline" 
            title="ASHA Worker" 
            desc="Community tools for health mobilization and patient reporting." 
            onPress={() => selectRole('asha')} 
          />
          <RoleCard 
            image={require('../assets/images/ani_doctor.png')}
            icon="medical-outline" 
            title="Doctor" 
            desc="Advanced clinical management and diagnostic oversight tools." 
            onPress={() => selectRole('doctor')} 
          />
          <RoleCard 
            image={require('../assets/images/ani_admin.png')}
            icon="settings-outline" 
            title="Administrator" 
            desc="System oversight, resource allocation, and facility analytics." 
            onPress={() => selectRole('admin')} 
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.supportLink}>Need help choosing? Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RoleCard({ title, desc, icon, onPress, image }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardText}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Ionicons name={icon as any} size={22} color="#0F6E56" />
        </View>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, paddingBottom: 40, flexGrow: 1, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#64748B', fontWeight: '500', textAlign: 'center' },
  
  cards: { width: '100%', marginBottom: 32 },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  cardImage: { width: 80, height: 80, borderRadius: 12, marginRight: 16, backgroundColor: '#F1F5F9' },
  cardText: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  cardDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  
  footer: { alignItems: 'center', marginTop: 8 },
  footerText: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  loginBtn: { 
    backgroundColor: '#0F172A', 
    width: '100%', 
    height: 56, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  loginBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  supportLink: { fontSize: 14, color: '#0F6E56', fontWeight: '600' },
});
