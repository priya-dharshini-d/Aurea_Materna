import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function ConnectDevice() {
  const router = useRouter();
  const [scanning, setScanning] = useState(true);
  const [deviceFound, setDeviceFound] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        setDeviceFound(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      // Transition to dashboard after connecting
      router.replace('/(mother)');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connect Device</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.radarContainer}>
          {scanning && (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          )}
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]}>
            <Ionicons name="bluetooth" size={48} color="white" />
          </View>
        </View>

        <Text style={styles.title}>
          {scanning ? 'Searching for Aurea Patch...' : deviceFound ? 'Device Found' : 'No Devices Found'}
        </Text>
        <Text style={styles.subtitle}>
          {scanning ? 'Make sure your patch is charged and nearby.' : deviceFound ? 'Aurea Materna Patch is ready to pair.' : 'Please ensure Bluetooth is enabled.'}
        </Text>

        {deviceFound && !connecting && (
          <View style={styles.deviceCard}>
            <View style={styles.deviceInfo}>
              <Ionicons name="hardware-chip" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.deviceName}>Aurea Patch (AM-892)</Text>
                <Text style={styles.deviceSignal}>Signal Strength: Excellent</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.connectBtn} onPress={handleConnect}>
              <Text style={styles.connectBtnText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}

        {connecting && (
          <View style={styles.connectingBox}>
            <ActivityIndicator size="small" color={Colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.connectingText}>Pairing and establishing secure link...</Text>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  content: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 24 },
  
  radarContainer: { position: 'relative', width: 240, height: 240, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  loader: { position: 'absolute', top: -30, zIndex: 10 },
  circle: { position: 'absolute', borderRadius: 120, alignItems: 'center', justifyContent: 'center' },
  circle1: { width: 240, height: 240, backgroundColor: 'rgba(56, 142, 60, 0.05)' },
  circle2: { width: 160, height: 160, backgroundColor: 'rgba(56, 142, 60, 0.1)' },
  circle3: { width: 100, height: 100, backgroundColor: Colors.primary, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 },
  
  deviceCard: { width: '100%', backgroundColor: 'white', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  deviceInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  deviceName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  deviceSignal: { fontSize: 12, color: Colors.success },
  
  connectBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100 },
  connectBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  
  connectingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryLight, padding: 16, borderRadius: 12, width: '100%', justifyContent: 'center' },
  connectingText: { color: Colors.primary, fontWeight: '600', fontSize: 14 }
});
