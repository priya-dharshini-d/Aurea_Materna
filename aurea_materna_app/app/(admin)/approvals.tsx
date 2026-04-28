import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';

// Mock Admin Data (District: Tirupur) - In real app, this comes from the logged-in admin's profile
const ADMIN_DISTRICT = "Tirupur";

export default function AdminApprovals() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null); // For details modal

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      console.log("Fetching all pending requests...");
      const { data, error } = await supabase
        .from('pending_approvals')
        .select('*'); // Removed district filter

      if (error) throw error;
      setPendingRequests(data || []);
    } catch (err: any) {
      Alert.alert("Error", "Could not fetch requests: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: any) => {
    setLoading(true);
    try {
      // 1. Generate a real ID for the main profile
      const userId = '00000000-0000-4000-8000-' + Math.floor(Math.random() * 1000000000000).toString(16).padStart(12, '0');

      // 2. Move to main PROFILES table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          full_name: request.full_name,
          phone_number: request.phone_number,
          email: request.email,
          password: request.password,
          role: request.role,
          location_village: request.location_village,
          location_district: request.location_district,
          verification_status: 'verified',
          is_verified: true
        }]);

      if (profileError) throw profileError;

      // 3. Move role-specific details
      if (request.role === 'asha') {
        await supabase.from('asha_details').insert([{
          profile_id: userId,
          gov_id: request.role_details.govId,
          asha_id_number: request.role_details.ashaId,
          phc_name: request.role_details.phc,
          work_location: request.location_village,
        }]);
      } else if (request.role === 'doctor') {
        await supabase.from('doctor_details').insert([{
          profile_id: userId,
          reg_number: request.role_details.regNo,
          hospital_name: request.role_details.hospital,
          specialization: request.role_details.spec,
        }]);
      }

      // 4. Delete from PENDING table
      await supabase.from('pending_approvals').delete().eq('id', request.id);

      Alert.alert("Success", `${request.full_name}'s account has been approved.`);
      fetchPendingRequests();
    } catch (err: any) {
      Alert.alert("Approval Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string, name: string) => {
    try {
      await supabase.from('pending_approvals').delete().eq('id', id);
      Alert.alert("Rejected", `${name}'s application has been removed.`);
      fetchPendingRequests();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Account Approvals</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{pendingRequests.length} New</Text>
        </View>
      </View>

      {loading && pendingRequests.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0F172A" />
        </View>
      ) : (
        <FlatList
          data={pendingRequests}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={fetchPendingRequests}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="checkmark-done-circle-outline" size={64} color="#CBD5E1" />
              <Text style={styles.emptyText}>No pending requests in {ADMIN_DISTRICT}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <View style={styles.roleTag}>
                  <Text style={styles.roleText}>{item.role.toUpperCase()}</Text>
                </View>
                <Text style={styles.name}>{item.full_name}</Text>
                <Text style={styles.details}>{item.location_village} • {item.role_details.phc || item.role_details.hospital}</Text>
                
                <TouchableOpacity 
                  style={styles.detailsLink}
                  onPress={() => setSelectedRequest(item)}
                >
                  <Text style={styles.detailsLinkText}>View All Details</Text>
                  <Ionicons name="chevron-forward" size={14} color="#0F6E56" />
                </TouchableOpacity>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.rejectBtn} 
                  onPress={() => handleReject(item.id, item.full_name)}
                >
                  <Ionicons name="close" size={24} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.approveBtn} 
                  onPress={() => handleApprove(item)}
                >
                  <Ionicons name="checkmark" size={24} color="white" />
                  <Text style={styles.approveText}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Details Modal */}
      <Modal
        visible={!!selectedRequest}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedRequest(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Application Details</Text>
              <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                <Ionicons name="close-circle" size={28} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedRequest && (
              <ScrollView style={styles.modalBody}>
                <DetailRow label="Full Name" value={selectedRequest.full_name} icon="person" />
                <DetailRow label="Role" value={selectedRequest.role?.toUpperCase()} icon="ribbon" />
                <DetailRow label="Email" value={selectedRequest.email} icon="mail" />
                <DetailRow label="Phone" value={selectedRequest.phone_number} icon="call" />
                <DetailRow label="District" value={selectedRequest.location_district} icon="map" />
                <DetailRow label="Village" value={selectedRequest.location_village} icon="location" />
                
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Role Specific Information</Text>
                
                {selectedRequest.role === 'asha' ? (
                  <>
                    <DetailRow label="Government ID" value={selectedRequest.role_details.govId} icon="card" />
                    <DetailRow label="ASHA ID" value={selectedRequest.role_details.ashaId} icon="id-card" />
                    <DetailRow label="Primary Health Center" value={selectedRequest.role_details.phc} icon="business" />
                  </>
                ) : (
                  <>
                    <DetailRow label="Reg Number" value={selectedRequest.role_details.regNo} icon="medical" />
                    <DetailRow label="Hospital" value={selectedRequest.role_details.hospital} icon="hospital" />
                    <DetailRow label="Specialization" value={selectedRequest.role_details.spec} icon="flask" />
                  </>
                )}
              </ScrollView>
            )}

            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={() => setSelectedRequest(null)}
            >
              <Text style={styles.closeBtnText}>Back to List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, icon }: any) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon as any} size={18} color="#64748B" />
      </View>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  subtitle: { fontSize: 14, color: '#64748B', fontWeight: '600', marginTop: 2 },
  badge: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  list: { padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  roleTag: { alignSelf: 'flex-start', backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  roleText: { fontSize: 10, fontWeight: '800', color: '#64748B' },
  name: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  details: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  detailsLink: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  detailsLinkText: { fontSize: 13, color: '#0F6E56', fontWeight: '700', marginRight: 4 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  rejectBtn: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#FEE2E2', backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  approveBtn: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#0F172A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  approveText: { color: 'white', fontWeight: '700' , marginLeft: 8 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, color: '#64748B', marginTop: 16, fontWeight: '600' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, height: '80%', padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  modalBody: { flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 24, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  detailIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  detailLabel: { fontSize: 12, color: '#64748B', fontWeight: '600', marginBottom: 2 },
  detailValue: { fontSize: 15, color: '#0F172A', fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginTop: 8 },
  closeBtn: { backgroundColor: '#F1F5F9', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  closeBtnText: { fontSize: 16, color: '#475569', fontWeight: '700' }
});
