import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const remindersData = [
  { id: 1, title: 'Prenatal Vitamin', time: '08:00 AM · Daily', type: 'Med', color: '#2E8B57', bg: '#E8F5E9' },
  { id: 2, title: 'OB-GYN Checkup', time: '10:30 AM · 28 Apr 2026', type: 'Appt', color: '#1976D2', bg: '#E3F2FD' },
  { id: 3, title: 'Iron Supplement', time: '01:00 PM · Daily', type: 'Med', color: '#C2185B', bg: '#FCE4EC' },
  { id: 4, title: 'Prenatal Yoga', time: '05:30 PM · Mon, Wed, Fri', type: 'Wellness', color: '#F57C00', bg: '#FFF3E0' },
  { id: 5, title: 'Folic Acid', time: '09:00 PM · Daily', type: 'Med', color: '#2E8B57', bg: '#E8F5E9' },
];

export default function RemindersPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState(remindersData);
  const [isModalVisible, setModalVisible] = useState(false);
  
  // New reminder form state
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState('Med');

  const handleAddReminder = () => {
    if (!newTitle.trim() || !newTime.trim()) {
      Alert.alert('Error', 'Please enter a title and time.');
      return;
    }
    
    let color = '#2E8B57';
    let bg = '#E8F5E9';
    if (newType === 'Appt') { color = '#1976D2'; bg = '#E3F2FD'; }
    if (newType === 'Wellness') { color = '#F57C00'; bg = '#FFF3E0'; }

    const newReminder = {
      id: Date.now(),
      title: newTitle,
      time: newTime,
      type: newType,
      color,
      bg
    };

    setReminders([...reminders, newReminder]);
    setModalVisible(false);
    setNewTitle('');
    setNewTime('');
    setNewType('Med');
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete Reminder', 'Are you sure you want to remove this reminder?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setReminders(reminders.filter(r => r.id !== id)) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.monthTitle}>April 2026</Text>

        <View style={styles.list}>
          {reminders.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onLongPress={() => handleDelete(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>

              <View style={[styles.badge, { backgroundColor: item.bg }]}>
                <Text style={[styles.badgeText, { color: item.color }]}>{item.type}</Text>
              </View>
              
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 8 }}>
                 <Ionicons name="trash-outline" size={20} color="#FF5252" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>


      </ScrollView>

      {/* Add Reminder Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Reminder</Text>
            
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Prenatal Vitamin"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.inputLabel}>Time Details</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 08:00 AM · Daily"
              value={newTime}
              onChangeText={setNewTime}
            />

            <Text style={styles.inputLabel}>Type</Text>
            <View style={styles.typeSelector}>
              {['Med', 'Appt', 'Wellness'].map(type => (
                <TouchableOpacity 
                  key={type} 
                  style={[styles.typeBtn, newType === type && styles.typeBtnActive]}
                  onPress={() => setNewType(type)}
                >
                  <Text style={[styles.typeBtnText, newType === type && styles.typeBtnTextActive]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={handleAddReminder}>
                <Text style={styles.modalBtnTextSave}>Save Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'serif',
  },
  addBtn: {
    backgroundColor: '#2E8B57',
    padding: 8,
    borderRadius: 8,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  monthTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 13,
    color: '#666',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomAddBtn: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA'
  },
  bottomAddText: {
    color: '#DDD',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  typeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeBtnText: {
    color: '#666',
    fontWeight: '500',
  },
  typeBtnTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  modalBtnTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modalBtnSave: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  modalBtnTextSave: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  }
});
