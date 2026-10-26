import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../api/client';
import { useAppStore } from '../store/useAppStore';

export function RoleSelectionScreen() {
  const login = useAppStore((state) => state.login);
  const token = useAppStore((state) => state.token);

  const selectRole = async (role: 'boa' | 'owner' | 'tenant') => {
    try {
      await api.patch('/api/users/profile/select-role/', { role });
      if (token) login(role, token);
    } catch (err: any) {
      Alert.alert('Error', 'Could not assign role.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <Text style={styles.subtitle}>Choose how you will be using Jidar</Text>

      <TouchableOpacity style={styles.card} onPress={() => selectRole('boa')}>
        <Text style={styles.cardTitle}>Board of Administration (BOA)</Text>
        <Text style={styles.cardDesc}>Manage buildings, issue fees, and audit receipts.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => selectRole('owner')}>
        <Text style={styles.cardTitle}>Property Owner</Text>
        <Text style={styles.cardDesc}>Manage owned apartments and track rental ledger.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => selectRole('tenant')}>
        <Text style={styles.cardTitle}>Tenant</Text>
        <Text style={styles.cardDesc}>View monthly bills and upload bank payment slips.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '800', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#00A36C', marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#6B7280' }
});
