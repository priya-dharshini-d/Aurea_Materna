import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
  let accentColor = '#22C55E'; // Green
  let iconName = 'check-circle';
  let iconColor = '#166534';
  let bgIcon = 'check-bold';
  let bgIconColor = '#22C55E';

  if (level === 'amber') {
    accentColor = '#B45309'; // Amber
    iconName = 'alert-decagram';
    iconColor = '#92400E';
    bgIcon = 'alert';
    bgIconColor = '#F59E0B';
  } else if (level === 'red') {
    accentColor = '#B91C1C'; // Red
    iconName = 'alert-circle';
    iconColor = '#991B1B';
    bgIcon = 'circle-double';
    bgIconColor = '#EF4444';
  }

  return (
    <View style={styles.card}>
      <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
      
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
             <MaterialCommunityIcons name={iconName as any} size={24} color={iconColor} />
          </View>
          
          <View style={styles.headerText}>
            <View style={styles.titleRow}>
              <MaterialCommunityIcons name={bgIcon as any} size={20} color={bgIconColor} style={{ marginRight: 8 }} />
              <Text style={styles.title}>{title}</Text>
            </View>
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
                <Ionicons name="call" size={18} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.btnCallText}>Call Mother</Text>
              </TouchableOpacity>
            )}
            {onEscalate && (
              <TouchableOpacity style={[styles.btn, styles.btnEscalate]} onPress={onEscalate}>
                <MaterialCommunityIcons name="transit-connection-variant" size={18} color="#1A202C" style={{ marginRight: 8 }} />
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
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    width: 5,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  cardContent: {
    padding: 20,
    paddingLeft: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  headerText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    fontWeight: '500',
  },
  aiBox: {
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
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
    marginTop: 20,
    gap: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCall: {
    backgroundColor: '#991B1B',
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
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
