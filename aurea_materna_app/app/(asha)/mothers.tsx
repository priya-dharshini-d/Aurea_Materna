import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Modal, KeyboardAvoidingView, Platform, SafeAreaView as RNSafeAreaView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { fetchFromApi } from '../../constants/api';
import { ActivityIndicator } from 'react-native';
import MotherRow from '../../components/MotherRow';

const filters = ['All', 'Normal', 'Watch', 'High Risk'];
const riskFactorOptions = ['Anaemia', 'Diabetes', 'Hypertension', 'Previous C-sec', 'Age <18 / >35'];

export default function AshaMothers() {
  const [ashaData, setAshaData] = useState<any>(null);
  const [mothersList, setMothersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFromApi('/asha');
        setAshaData(data);
        setMothersList(data.mothers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!ashaData) return null;
  
  // Add Mother Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMotherName, setNewMotherName] = useState('');
  const [newMotherAge, setNewMotherAge] = useState('');
  const [newMotherBloodGroup, setNewMotherBloodGroup] = useState('');
  const [newMotherPhone, setNewMotherPhone] = useState('');
  const [newMotherLmp, setNewMotherLmp] = useState('');
  const [newMotherGravida, setNewMotherGravida] = useState('');
  const [newMotherVillage, setNewMotherVillage] = useState('');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const toggleRisk = (risk: string) => {
    if (selectedRisks.includes(risk)) {
      setSelectedRisks(selectedRisks.filter(r => r !== risk));
    } else {
      setSelectedRisks([...selectedRisks, risk]);
    }
  };

  const handleAddMother = () => {
    if (!newMotherName.trim()) return;
    
    const initials = newMotherName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'M';
    const hasRisk = selectedRisks.length > 0;
    
    const newMother = {
      id: Date.now(),
      initials,
      name: newMotherName,
      week: 12, // Default calculated from LMP in a real app
      pprs: hasRisk ? Math.floor(Math.random() * 20) + 30 : Math.floor(Math.random() * 40) + 60,
      status: hasRisk ? 'amber' : 'green',
      bp: '120/80',
    };
    
    setMothersList([newMother, ...mothersList]);
    setModalVisible(false);
    
    // Reset form
    setNewMotherName('');
    setNewMotherAge('');
    setNewMotherBloodGroup('');
    setNewMotherPhone('');
    setNewMotherLmp('');
    setNewMotherGravida('');
    setNewMotherVillage('');
    setSelectedRisks([]);
  };

  const filteredMothers = mothersList.filter(m => {
    let statusFilter = 'all';
    if (activeFilter === 'Normal') statusFilter = 'green';
    if (activeFilter === 'Watch') statusFilter = 'amber';
    if (activeFilter === 'High Risk') statusFilter = 'red';

    if (activeFilter !== 'All' && m.status !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.pageTitle}>Mothers list</Text>
          <Text style={styles.subtitle}>{mothersList.length} registered · Panchayat {ashaData.panchayat}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={28} color="#2A62C9" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by name..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={{ height: 36, marginBottom: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {filters.map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={filteredMothers}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MotherRow 
            {...item}
            status={item.status as any}
            onPress={() => {}} 
          />
        )}
      />

      {/* Add Mother Modal - Full Screen */}
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <RNSafeAreaView style={styles.modalFullContainer}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color="#CBD5E1" />
              </TouchableOpacity>
              <View style={styles.modalHeaderTitleBox}>
                <Text style={styles.modalTitle}>Register mother</Text>
                <Text style={styles.modalSubtitle}>New beneficiary registration</Text>
              </View>
            </View>

            {/* Modal Form Content */}
            <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.formCard}>
                
                <Text style={styles.inputLabel}>Full name</Text>
                <TextInput 
                  style={styles.inputWhite} 
                  placeholder="Mother's full name" 
                  placeholderTextColor="#94A3B8"
                  value={newMotherName}
                  onChangeText={setNewMotherName}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputLabel}>Age</Text>
                    <TextInput 
                      style={styles.inputWhite} 
                      placeholder="e.g. 24" 
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      value={newMotherAge}
                      onChangeText={setNewMotherAge}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputLabel}>Blood group</Text>
                    <TextInput 
                      style={styles.inputWhite} 
                      placeholder="A+" 
                      placeholderTextColor="#94A3B8"
                      value={newMotherBloodGroup}
                      onChangeText={setNewMotherBloodGroup}
                    />
                  </View>
                </View>

                <Text style={styles.inputLabel}>Phone number</Text>
                <TextInput 
                  style={styles.inputWhite} 
                  placeholder="+91 XXXXX XXXXX" 
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={newMotherPhone}
                  onChangeText={setNewMotherPhone}
                />

                <Text style={styles.inputLabel}>Last menstrual period (LMP)</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={[styles.inputWhite, { flex: 1, marginBottom: 0 }]} 
                    placeholder="dd-mm-yyyy" 
                    placeholderTextColor="#94A3B8"
                    value={newMotherLmp}
                    onChangeText={setNewMotherLmp}
                  />
                  <View style={styles.inputIconBox}>
                    <Ionicons name="calendar-outline" size={20} color="#94A3B8" />
                  </View>
                </View>

                <Text style={[styles.inputLabel, { marginTop: 20 }]}>Gravida / Para</Text>
                <TextInput 
                  style={styles.inputWhite} 
                  placeholder="G1P0 (First pregnancy)" 
                  placeholderTextColor="#94A3B8"
                  value={newMotherGravida}
                  onChangeText={setNewMotherGravida}
                />

                <Text style={styles.inputLabel}>High-risk factors (select all that apply)</Text>
                <View style={styles.riskPillsContainer}>
                  {riskFactorOptions.map(risk => {
                    const isSelected = selectedRisks.includes(risk);
                    return (
                      <TouchableOpacity 
                        key={risk} 
                        style={[styles.riskPill, isSelected && styles.riskPillActive]}
                        onPress={() => toggleRisk(risk)}
                      >
                        <Text style={[styles.riskPillText, isSelected && styles.riskPillTextActive]}>{risk}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text style={[styles.inputLabel, { marginTop: 16 }]}>Village / Hamlet</Text>
                <TextInput 
                  style={styles.inputWhite} 
                  placeholder="Village name" 
                  placeholderTextColor="#94A3B8"
                  value={newMotherVillage}
                  onChangeText={setNewMotherVillage}
                />

                <TouchableOpacity style={styles.submitBtnWhite} onPress={handleAddMother}>
                  <Text style={styles.submitBtnTextWhite}>Register Beneficiary</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </RNSafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    padding: 16, 
    paddingBottom: 24, 
    paddingTop: 20 
  },
  headerTextContainer: {
    flex: 1,
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 6 },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 16,
    marginTop: 4,
  },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg, marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 12, height: 44, marginBottom: 16 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  filtersRow: { paddingHorizontal: 16, gap: 8, marginBottom: 16, height: 36 },
  filterPill: { paddingHorizontal: 16, justifyContent: 'center', borderRadius: 100, backgroundColor: Colors.bg },
  filterPillActive: { backgroundColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '500', color: Colors.textPrimary },
  filterTextActive: { color: 'white' },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
  
  // Modal Full Screen Styles
  modalFullContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  modalHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#F8FAFC' 
  },
  backBtn: {
    width: 40, height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginRight: 16,
  },
  modalHeaderTitleBox: { flex: 1 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  modalSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  
  modalScrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8 },
  inputWhite: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 20,
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0', 
    borderRadius: 10 
  },
  inputIconBox: { paddingRight: 16 },
  
  riskPillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  riskPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#F1F5F9',
  },
  riskPillActive: {
    backgroundColor: '#E0E7FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  riskPillText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  riskPillTextActive: { color: '#3730A3', fontWeight: '600' },
  
  submitBtnWhite: {
    backgroundColor: '#2A62C9',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#2A62C9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnTextWhite: { color: 'white', fontSize: 15, fontWeight: '700' },
});
