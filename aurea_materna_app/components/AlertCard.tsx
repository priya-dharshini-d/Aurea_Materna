import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

type Props = {
  level: 'red' | 'amber' | 'green';
  title: string;
  subtitle: string;
  aiRecommendation?: string;
  onCall?: () => void;
  onEscalate?: () => void;
};

export default function AlertCard({ level, title, subtitle, aiRecommendation, onCall, onEscalate }: Props) {
  let accentColor = Colors.success;
  let iconName = 'checkmark-circle';
  let iconColor = Colors.success;

  if (level === 'amber') {
    accentColor = '#905E15'; // Darker amber from screenshot
    iconName = 'warning';
    iconColor = '#905E15';
  } else if (level === 'red') {
    accentColor = '#A02B2B'; // Dark red from screenshot
    iconName = 'alert-circle';
    iconColor = '#A02B2B';
  }

  return (
    <View style={styles.card}>
      <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
      
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Ionicons name={iconName as any} size={22} color={iconColor} style={styles.icon} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        
        {aiRecommendation && (
          <View style={styles.aiBox}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={14} color="#0052CC" style={{ marginRight: 6 }} />
              <Text style={styles.aiTitle}>AI Analysis</Text>
            </View>
            <Text style={styles.aiText}>{aiRecommendation}</Text>
          </View>
        )}

        {(onCall || onEscalate) && (
          <View style={styles.btnRow}>
            {onCall && (
              <TouchableOpacity style={[styles.btn, styles.btnCall]} onPress={onCall}>
                <Ionicons name="call" size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.btnCallText}>Call Mother</Text>
              </TouchableOpacity>
            )}
            {onEscalate && (
              <TouchableOpacity style={[styles.btn, styles.btnEscalate]} onPress={onEscalate}>
                <Ionicons name="git-network-outline" size={16} color="#1A202C" style={{ marginRight: 8 }} />
                <Text style={styles.btnEscalateText}>Escalate</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 14,
    bottom: 14,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  cardContent: {
    padding: 16,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
    marginTop: 0,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 18,
  },
  aiBox: {
    backgroundColor: '#F5F7FF',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  aiTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0052CC',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aiText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCall: {
    backgroundColor: '#A02B2B',
  },
  btnCallText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  btnEscalate: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnEscalateText: {
    color: '#1A202C',
    fontSize: 14,
    fontWeight: '700',
  },
});
