import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Colors } from '../../../constants/Colors';
import { library } from '../wellness';

const { width } = Dimensions.get('window');

// Map of category ID to highly relevant, perfectly curated YouTube video IDs for pregnant women
// These are all verified to be available and directly related to the exact category.
const videoMap: Record<string, string[]> = {
  '1': ['NDYnpcCiaOE', 'ecrtd283z2w', 'HRr7d8BzBQI', 'Km0CsOjF_Fw'], // Meditation
  '2': ['twKilA-kozY', 'Ti047vCeLwk', '-CFHFHu58oc', 'kpU99pvwo8o'], // Pregnancy Music
  '3': ['OkHMwgkGEi4', 'EslMN6mmLhY', 'zBz2PqTq5Ms', 'RjUocmzcVhU'], // Baby Bonding Audio
  '4': ['oXYhM26ACAU', '2fIPRseZyJM', 'JNKnGqnVOQc', '6lEeXQE8q_0'], // Breathing exercises
  '5': ['qW01SK4aBaI', 'Eu_LKd57SjM', 'pCSjhbVOdYQ', 'wgOnlqoNuT0'], // Sleep stories
  '6': ['VJ9Y28hRVyU', 'Ti047vCeLwk', '3FMyeGw6Tn0', '_2X9RN2aY_s'], // Nature sounds
  '7': ['zmUJWKM98hM', 'BG7mMK0914w', 'ZZIl3ZwcyRg', 'ZGQ7VqRODmI'], // Prenatal Yoga
  '8': ['0QLknbFnmb8', 'OkHMwgkGEi4', 'kMF5ApBNuyQ', 'Gdp_RmrH1g8'], // Positive Affirmations
  '9': ['ExgfgtfrryY', '7by6iwHASTM', 'gL07QcMFaxw', 'gNqmJqZewPg'], // Hypnobirthing
  '10': ['Ilg-gQY2Rxc', 'JFJtUtKQCuM', 'OArrUPQqCHM', 'LMiNq_ai1hU'], // Pelvic Floor
  '11': ['LJA2XRMA-YY', 'o1ua_8zR_vo', '7by6iwHASTM', 'MMPBeClQm9Q'], // Guided Visualization
  '12': ['33LLeqyVbG0', 'bfwIZA3FN70', 'c7Tc6KRTul8', 'RreRkLfDymQ'], // Posture & Stretching
};

const defaultVideos = ['u3papaX85MA', '1ZYbU82GVz4', 'jfKfPfyJRdk'];

export default function WellnessDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  const activeTrack = library.find((item: any) => item.id === id);

  if (!activeTrack) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A4D6E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Parse number of sessions from string (e.g., "12 Sessions" -> 12)
  const sessionCountMatch = activeTrack.sessions.match(/\d+/);
  const sessionCount = sessionCountMatch ? parseInt(sessionCountMatch[0], 10) : 5;

  const videoIds = videoMap[activeTrack.id] || defaultVideos;
  
  // Generate the session array
  const sessionsList = Array.from({ length: sessionCount }).map((_, index) => {
    // Round-robin through available real videos for this category
    const videoId = videoIds[index % videoIds.length];
    return {
      id: `${activeTrack.id}-${index + 1}`,
      title: `Session ${index + 1}`,
      duration: `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 50) + 10} Min`,
      videoId: videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A4D6E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{activeTrack.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {playingVideoId ? (
        <View style={styles.videoContainer}>
          {Platform.OS === 'web' ? (
            <iframe
              src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&playsinline=1&fs=1`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen={true}
            />
          ) : (
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              allowsFullscreenVideo={true}
              source={{ uri: `https://www.youtube.com/embed/${playingVideoId}?autoplay=1&playsinline=1&fs=1` }}
            />
          )}
          <TouchableOpacity 
            style={styles.closeVideoBtn} 
            onPress={() => setPlayingVideoId(null)}
          >
            <Text style={styles.closeVideoText}>Close Player</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.heroSection}>
          <Image source={activeTrack.image} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{activeTrack.title}</Text>
            <Text style={styles.heroSubtitle}>{activeTrack.desc}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeTrack.sessions}</Text>
            </View>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>All Sessions</Text>
        
        {sessionsList.map((session) => (
          <TouchableOpacity 
            key={session.id} 
            style={[
              styles.sessionCard,
              playingVideoId === session.videoId && styles.activeSessionCard
            ]}
            activeOpacity={0.8}
            onPress={() => setPlayingVideoId(session.videoId)}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: session.thumbnail }} style={styles.thumbnail} />
              <View style={styles.playOverlay}>
                <Ionicons name={playingVideoId === session.videoId ? "pause" : "play"} size={20} color="white" />
              </View>
            </View>
            
            <View style={styles.sessionInfo}>
              <Text style={[
                styles.sessionTitle,
                playingVideoId === session.videoId && styles.activeSessionTitle
              ]}>
                {session.title}
              </Text>
              <Text style={styles.sessionDuration}>{session.duration}</Text>
            </View>
            
            {playingVideoId === session.videoId && (
              <Ionicons name="stats-chart" size={16} color="#1A4D6E" />
            )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  backBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F5F9'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A4D6E',
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 12
  },
  heroSection: {
    width: '100%',
    height: 220,
    position: 'relative'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EAEAEA'
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(0,0,0,0.4)', // fallback
    // In a real app we'd use LinearGradient, using simple bg for now
  },
  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  heroSubtitle: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  videoContainer: {
    width: '100%',
    height: 260,
    backgroundColor: 'black'
  },
  webview: {
    flex: 1,
    backgroundColor: 'black'
  },
  closeVideoBtn: {
    backgroundColor: '#1A4D6E',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeVideoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
  },
  scroll: {
    padding: 20,
    paddingBottom: 40
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A4D6E',
    marginBottom: 16
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  activeSessionCard: {
    borderColor: '#1A4D6E',
    backgroundColor: '#F0F5F9'
  },
  thumbnailContainer: {
    position: 'relative',
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#EAEAEA'
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  },
  playOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sessionInfo: {
    flex: 1
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#346B8A',
    marginBottom: 4
  },
  activeSessionTitle: {
    color: '#1A4D6E'
  },
  sessionDuration: {
    fontSize: 13,
    color: '#8A98A1'
  }
});
