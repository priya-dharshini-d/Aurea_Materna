import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AuthStatus() {
  const router = useRouter();
  const { pending } = useLocalSearchParams<{ pending: string }>();
  
  const isPending = pending === 'true';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: isPending ? '#FEF9C3' : '#DCFCE7' }]}>
          <Ionicons 
            name={isPending ? "time" : "checkmark-circle"} 
            size={80} 
            color={isPending ? "#A16207" : "#15803D"} 
          />
        </View>

        <Text style={styles.title}>{isPending ? 'Account Under Review' : 'Account Created Successfully!'}</Text>
        <Text style={styles.desc}>
          {isPending 
            ? 'For ASHA and Doctor roles, we strictly verify credentials. Your application is currently being reviewed by the PHC administration.'
            : 'Your credentials have been saved to our secure database. You can now access your role-specific dashboard.'}
        </Text>

        {!isPending ? (
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => router.push(`/(mother)` as any)}
          >
            <Text style={styles.primaryBtnText}>Go to Dashboard</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.statusBadge}>
            <Text style={styles.statusLabel}>Current Status:</Text>
            <View style={styles.badge}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>Pending Admin Approval</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.backHome} onPress={() => router.push('/')}>
          <Text style={styles.backHomeText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  iconCircle: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 16, textAlign: 'center' },
  desc: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24, marginBottom: 40, paddingHorizontal: 20 },
  primaryBtn: { backgroundColor: '#0F172A', height: 56, width: '100%', borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  statusBadge: { alignItems: 'center', marginBottom: 32 },
  statusLabel: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF9C3', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: '#FEF08A' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A16207', marginRight: 8 },
  badgeText: { color: '#854F0B', fontWeight: '700', fontSize: 14 },
  backHome: { marginTop: 24 },
  backHomeText: { color: '#64748B', fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }
});
