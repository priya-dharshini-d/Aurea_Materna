import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 220;
const IMAGE_HEIGHT = 130;

const contentSections = [

  {
    title: "Pregnancy-related Conditions",
    items: [
      { id: 1, title: "Mental health during pregnancy", image: require('../../assets/images/img_cond1.png') },
      { id: 2, title: "FAQs about pregnancy discomforts", image: require('../../assets/images/img_id2.png') },
      { id: 14, title: "Vaginal bleeding during pregnancy", image: require('../../assets/images/img_id14.png') },
      { id: 15, title: "FAQs about contractions", image: require('../../assets/images/img_cond2.png') },
      { id: 16, title: "Pregnancy-related conditions", image: require('../../assets/images/img_id16.png') },
    ]
  },
  {
    title: "Knowledge about Antenatal Care",
    items: [
      { id: 3, title: "Amniotic fluid FAQs", image: require('../../assets/images/img_care1.png') },
      { id: 4, title: "Pregnancy due date", image: require('../../assets/images/img_care2.png') },
      { id: 17, title: "FAQs about fetus", image: require('../../assets/images/img_id17.png') },
      { id: 18, title: "FAQs about prenatal check-ups", image: require('../../assets/images/img_id18.png') },
    ]
  },
  {
    title: "Nutrition During Pregnancy",
    items: [
      { id: 5, title: "Pregnancy diet", image: require('../../assets/images/img_nutri.png') },
      { id: 6, title: "FAQs about nutrition", image: require('../../assets/images/img_id6.png') },
    ]
  },
  {
    title: "Body Changes During Pregnancy",
    items: [
      { id: 7, title: "How your body changes during pregnancy", image: require('../../assets/images/img_body.png') },
    ]
  },
  {
    title: "Pregnancy Lifestyle",
    items: [
      { id: 8, title: "Exercise during pregnancy", image: require('../../assets/images/img_life1.png') },
      { id: 9, title: "Learning in the womb", image: require('../../assets/images/img_extra1.jpg') },
      { id: 19, title: "Sleep during pregnancy", image: require('../../assets/images/img_life2.png') },
      { id: 20, title: "Weight control during pregnancy", image: require('../../assets/images/img_id20.png') },
      { id: 21, title: "Sex during pregnancy", image: require('../../assets/images/img_extra2.jpg') },
    ]
  },
  {
    title: "Preparing for Childbirth",
    items: [
      { id: 10, title: "What you need to know about childbirth", image: require('../../assets/images/img_childbirth.png') },
      { id: 11, title: "Signs of labor", image: require('../../assets/images/img_extra3.jpg') },
    ]
  },
  {
    title: "Abnormal Pregnancy",
    items: [
      { id: 12, title: "Molar pregnancy", image: require('../../assets/images/img_abnormal.png') },
      { id: 13, title: "Spontaneous abortion", image: require('../../assets/images/img_extra4.jpg') },
    ]
  }
];

export default function MotherLearn() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Learning Center</Text>
        </View>
        
        {contentSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.horizontalScroll}
            >
              {section.items.map(item => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.card} 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(mother)/category/${item.id}` as any)}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingVertical: 16, paddingTop: 4, paddingBottom: 40 },
  header: { 
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A4D6E',
    lineHeight: 32
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: Colors.textPrimary, 
    marginBottom: 10,
    paddingHorizontal: 16 
  },
  
  horizontalScroll: { 
    paddingHorizontal: 16, 
    gap: 16 
  },
  
  card: { 
    width: CARD_WIDTH,
  },
  cardImage: { 
    width: '100%', 
    height: IMAGE_HEIGHT, 
    borderRadius: 12, 
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    resizeMode: 'cover'
  },
  cardTitle: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: Colors.textPrimary,
    lineHeight: 18 
  }
});
