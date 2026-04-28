import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export const library = [
  {
    id: '1',
    title: 'Meditation',
    desc: 'Guided breathing and mindfulness journeys for anxiety relief.',
    sessions: '12 Sessions',
    image: require('../../assets/images/img_life1.png')
  },
  {
    id: '2',
    title: 'Pregnancy Music',
    desc: 'Soft acoustic and classical melodies designed to lower heart rates.',
    sessions: '24 Tracks',
    image: require('../../assets/images/img_care1.png')
  },
  {
    id: '3',
    title: 'Baby Bonding Audio',
    desc: 'Womb sounds and soft vocalizations to soothe your little one.',
    sessions: '8 Tracks',
    image: require('../../assets/images/img_childbirth.png')
  },
  {
    id: '4',
    title: 'Breathing exercises',
    desc: 'Pranayama and deep breathing techniques for third trimester comfort and labour preparation.',
    sessions: '8 Exercises',
    image: require('../../assets/images/img_body.png')
  },
  {
    id: '5',
    title: 'Sleep stories',
    desc: 'Soothing bedtime stories narrated in Tamil to help you drift into a peaceful sleep.',
    sessions: '6 Stories',
    image: require('../../assets/images/img_care2.png')
  },
  {
    id: '6',
    title: 'Nature sounds',
    desc: 'Calming sounds of the natural world. Downloaded and available for offline listening.',
    sessions: '30 Min',
    image: require('../../assets/images/img_cond1.png')
  },
  {
    id: '7',
    title: 'Prenatal Yoga',
    desc: 'Gentle stretching and poses to improve flexibility, relieve back pain, and prepare your body for childbirth.',
    sessions: '15 Sessions',
    image: require('../../assets/images/img_cond2.png')
  },
  {
    id: '8',
    title: 'Positive Affirmations',
    desc: 'Daily affirmations designed to boost your confidence, reduce anxiety, and promote mental well-being.',
    sessions: '10 Tracks',
    image: require('../../assets/images/img_id16.png')
  },
  {
    id: '9',
    title: 'Hypnobirthing Guides',
    desc: 'Relaxation and self-hypnosis techniques to help you manage pain and stay calm during labor.',
    sessions: '5 Guides',
    image: require('../../assets/images/img_id17.png')
  },
  {
    id: '10',
    title: 'Pelvic Floor Training',
    desc: 'Audio-guided Kegel exercises to strengthen your pelvic floor muscles safely during pregnancy.',
    sessions: 'Daily Routine',
    image: require('../../assets/images/img_id18.png')
  },
  {
    id: '11',
    title: 'Guided Visualization',
    desc: 'Visualize a safe, calm, and healthy delivery to build a positive mindset and reduce stress.',
    sessions: '4 Sessions',
    image: require('../../assets/images/img_id20.png')
  },
  {
    id: '12',
    title: 'Posture & Stretching',
    desc: 'Simple routines to relieve back pain and adjust to your changing center of gravity.',
    sessions: '7 Routines',
    image: require('../../assets/images/img_nutri.png')
  }
];

import { useRouter } from 'expo-router';

export default function MotherWellness() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Wellness Library</Text>
        </View>
        {library.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            activeOpacity={0.9}
            onPress={() => router.push(`/(mother)/wellness/${item.id}` as any)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.playBtn}>
                  <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
                </View>
                <Text style={styles.sessionText}>{item.sessions}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 20,
    paddingBottom: 24
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A4D6E',
    lineHeight: 32
  },
  voiceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D7E5DB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20
  },
  voiceBadgeText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 120 // Space for player
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#EAEAEA'
  },
  cardContent: {
    padding: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#346B8A',
    marginBottom: 8
  },
  cardDesc: {
    fontSize: 13,
    color: '#5A6B75',
    lineHeight: 18,
    marginBottom: 16
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#154B6E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  sessionText: {
    fontSize: 12,
    color: '#8A98A1',
    fontWeight: '500'
  }
});
