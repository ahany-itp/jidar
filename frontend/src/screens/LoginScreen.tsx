import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { api } from '../api/client';
import { useAppStore } from '../store/useAppStore';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAppStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/api/users/auth/login/', { email, password });
      login(res.data.user.role, res.data.token);
    } catch (err: any) {
      Alert.alert('Login Failed', err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jidar</Text>
      <Text style={styles.subtitle}>Sign in to your property portal</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#00A36C', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#FFF', height: 56, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, marginBottom: 16 },
  button: { backgroundColor: '#00A36C', height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  linkText: { color: '#00A36C', textAlign: 'center', fontWeight: '600' }
});
