import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

import { getArticleData } from '../../../constants/ArticleData';

export default function ArticlePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const article = getArticleData(id as string);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
          <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.tag}>
          <Text style={styles.tagText}>{article.categoryTitle}</Text>
          <Ionicons name="chevron-forward" size={12} color="#E91E63" />
        </View>

        <Image source={article.image} style={styles.heroImage} />

        {article.content.map((block: any, idx: number) => {
          if (block.type === 'subheading') {
            return <Text key={idx} style={styles.subHeading}>{block.value}</Text>;
          }
          // type === 'text'
          return <Text key={idx} style={styles.paragraph}>{block.value}</Text>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: 12
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#F8BBD0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 20
  },
  tagText: {
    color: '#E91E63',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 24
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24
  },
  bold: {
    fontWeight: '700'
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8
  }
});
