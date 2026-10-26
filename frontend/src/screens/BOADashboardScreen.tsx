import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export function BOADashboardScreen() {
  const logout = useAppStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOA Admin Workspace</Text>
      <Text style={styles.desc}>Manage your property, issue charges, and audit receipts.</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 12 },
  desc: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  logoutBtn: { backgroundColor: '#DC2626', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  logoutText: { color: '#FFF', fontWeight: '700' }
});
