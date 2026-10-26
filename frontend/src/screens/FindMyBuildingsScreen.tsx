import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '../api/client';
import { useAppStore } from '../store/useAppStore';

export function FindMyBuildingsScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const logout = useAppStore((state) => state.logout);

  const searchBuildings = async (text: string) => {
    setQuery(text);
    try {
      const res = await api.get(`/api/properties/buildings/search/?q=${text}`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Building</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by building name or street..."
        value={query}
        onChangeText={searchBuildings}
      />

      <FlatList
        data={results}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardAddress}>{item.address}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No buildings found. Try another query.</Text>}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 24, paddingTop: 64 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 16 },
  searchBar: { backgroundColor: '#FFF', height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#00A36C' },
  cardAddress: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 40 },
  logoutBtn: { backgroundColor: '#DC2626', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#FFF', fontWeight: '700' }
});
