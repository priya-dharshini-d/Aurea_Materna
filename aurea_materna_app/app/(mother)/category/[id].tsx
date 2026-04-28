import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

const { width } = Dimensions.get('window');

import { getCategoryData } from '../../../constants/ArticleData';

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Load dynamic category data based on the requested ID
  const categoryData = getCategoryData(id as string);
  
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
        <View style={styles.headerImageContainer}>
          <Image source={categoryData.image} style={styles.headerImage} />
          
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>{categoryData.title}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          {categoryData.articles.map((article: any) => (
            <TouchableOpacity 
              key={article.id} 
              style={styles.articleRow}
              activeOpacity={0.7}
              onPress={() => router.push(`/(mother)/article/${article.id}` as any)}
            >
              <Image source={article.image} style={styles.articleThumb} />
              <View style={styles.articleInfo}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDesc} numberOfLines={2}>{article.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { paddingBottom: 40 },
  headerImageContainer: {
    width: '100%',
    height: width * 0.7,
    position: 'relative'
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 40,
    // rough gradient effect via background color if actual gradient component not available
    backgroundColor: 'rgba(255,255,255,0.85)' 
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textPrimary
  },
  content: {
    padding: 16
  },
  articleRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  articleThumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: Colors.bg
  },
  articleInfo: {
    flex: 1,
    marginLeft: 16
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 4,
    lineHeight: 20
  },
  articleDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18
  }
});
