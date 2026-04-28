import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Calendar } from 'react-native-calendars';

const trackerOptions = [
  { id: 'weight', title: 'Weight', icon: 'scale', iconColor: '#9C27B0', bg: '#F3E5F5', action: 'plus' },
  { id: 'habit', title: 'Habit', icon: 'water', iconColor: '#2196F3', bg: '#E3F2FD', action: 'icons', icons: ['fast-food', 'apple', 'cafe', 'walk', 'water'] },
  { id: 'symptoms', title: 'Symptoms', icon: 'medkit', iconColor: '#00BCD4', bg: '#E0F7FA', action: 'plus' },
  { id: 'sex', title: 'Sex', icon: 'heart', iconColor: '#E91E63', bg: '#FCE4EC', action: 'plus' },
  { id: 'diary', title: 'Diary', icon: 'book', iconColor: '#E91E63', bg: '#FCE4EC', action: 'camera' },
  { id: 'mood', title: 'Mood', icon: 'happy', iconColor: '#FFC107', bg: '#FFF8E1', action: 'icons', icons: ['sad', 'happy', 'sad-outline', 'happy-outline'] },
  { id: 'temp', title: 'Body temperature', icon: 'thermometer', iconColor: '#9C27B0', bg: '#F3E5F5', action: 'plus' },
];

export default function TrackerPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Daily data structure: { '2026-04-28': { weight: '65', habit: ['water'], mood: 'happy' } }
  const [dailyData, setDailyData] = useState<Record<string, any>>({});
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const currentData = dailyData[selectedDate] || {};

  const handleIconPress = (trackerId: string, icon: string) => {
    setDailyData(prev => {
      const dayData = prev[selectedDate] || {};
      let currentVal = dayData[trackerId];
      
      if (trackerId === 'mood') {
        currentVal = currentVal === icon ? null : icon;
      } else {
        // Multi-select for habits
        currentVal = currentVal || [];
        if (currentVal.includes(icon)) {
          currentVal = currentVal.filter((i: string) => i !== icon);
        } else {
          currentVal = [...currentVal, icon];
        }
      }
      
      return {
        ...prev,
        [selectedDate]: { ...dayData, [trackerId]: currentVal }
      };
    });
  };

  const openModal = (type: string) => {
    setModalType(type);
    setInputValue(currentData[type] || '');
    setModalVisible(true);
  };

  const saveModalData = () => {
    if (modalType) {
      setDailyData(prev => ({
        ...prev,
        [selectedDate]: { ...(prev[selectedDate] || {}), [modalType]: inputValue }
      }));
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Tracker</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#E91E63' }
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#E91E63',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#E91E63',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#E91E63',
              selectedDotColor: '#ffffff',
              arrowColor: '#E91E63',
              monthTextColor: '#333',
              indicatorColor: '#E91E63',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />

          <View style={[styles.legendRow, { marginTop: 20 }]}>
             <View style={styles.legendItem}>
               <View style={[styles.legendColor, { backgroundColor: '#FFB74D' }]} />
               <Text style={styles.legendText}>1st Trim</Text>
             </View>
             <View style={styles.legendItem}>
               <View style={[styles.legendColor, { backgroundColor: '#F06292' }]} />
               <Text style={styles.legendText}>2nd Trim</Text>
             </View>
             <View style={styles.legendItem}>
               <View style={[styles.legendColor, { backgroundColor: '#4FC3F7' }]} />
               <Text style={styles.legendText}>3rd Trim</Text>
             </View>
          </View>
        </View>

        {/* Tracker Options */}
        <View style={styles.trackerList}>
          {trackerOptions.map(item => {
            const val = currentData[item.id];
            const hasValue = val !== undefined && val !== null && val !== '' && (!Array.isArray(val) || val.length > 0);

            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.trackerRow}
                onPress={() => {
                  if (item.action === 'plus' || item.action === 'camera') openModal(item.id);
                }}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBg, { backgroundColor: item.bg }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                  </View>
                  <Text style={styles.trackerTitle}>{item.title}</Text>
                </View>

                <View style={styles.rowRight}>
                  {item.action === 'plus' && (
                    hasValue ? (
                      <Text style={styles.valText}>{val} {item.id === 'weight' ? 'kg' : item.id === 'temp' ? '°C' : ''}</Text>
                    ) : (
                      <Ionicons name="add-circle-outline" size={28} color="#E91E63" />
                    )
                  )}
                  
                  {item.action === 'camera' && (
                    hasValue ? (
                      <Text style={styles.valText} numberOfLines={1}>Saved</Text>
                    ) : (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="camera" size={24} color="#DDD" style={{ marginRight: 8 }} />
                        <Ionicons name="chevron-forward" size={20} color="#CCC" />
                      </View>
                    )
                  )}

                  {item.action === 'icons' && item.icons && (
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      {item.icons.map((icon, idx) => {
                        let isSelected = false;
                        if (item.id === 'mood') isSelected = val === icon;
                        else isSelected = Array.isArray(val) && val.includes(icon);

                        return (
                          <TouchableOpacity key={idx} onPress={() => handleIconPress(item.id, icon)}>
                            <Ionicons 
                              name={icon as any} 
                              size={28} 
                              color={isSelected ? item.iconColor : "#E0E0E0"} 
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* Generic Input Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter {trackerOptions.find(t => t.id === modalType)?.title}</Text>
            
            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Type here..."
              autoFocus
              multiline={modalType === 'diary' || modalType === 'symptoms'}
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={saveModalData}>
                <Text style={styles.modalBtnTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  scroll: { paddingBottom: 40 },
  
  calendarContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekDayText: {
    fontSize: 12,
    color: '#999',
    width: 40,
    textAlign: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  dayCell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTextOff: { fontSize: 16, color: '#D2B48C' },
  dayTextOn: { fontSize: 16, color: '#D2B48C' },
  activeDay: {
    borderWidth: 2,
    borderColor: '#E91E63',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  activeDayText: { fontSize: 16, color: '#D2B48C', fontWeight: '600' },
  todayLabel: {
    fontSize: 10,
    color: '#D2B48C',
    position: 'absolute',
    bottom: -16,
  },
  
  monthDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dotOff: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E0E0E0', marginRight: 4, marginLeft: 16 },
  dotOn: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E91E63', marginRight: 4, marginLeft: 16 },
  dotTextOff: { fontSize: 12, color: '#999' },
  dotTextOn: { fontSize: 12, color: '#E91E63' },

  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendColor: { width: 12, height: 12, borderRadius: 2, marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },

  trackerList: {
    marginTop: 8,
    backgroundColor: '#FFF',
  },
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  trackerTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E91E63',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 50,
    maxHeight: 150,
    color: '#333',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  modalBtnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalBtnTextCancel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalBtnSave: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalBtnTextSave: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  }
});
