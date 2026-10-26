import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { api } from '../api/client';
import { useAppStore } from '../store/useAppStore';

export function RegistrationScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAppStore((state) => state.login);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/api/users/auth/register/', { name, email, password });
      login(res.data.user.role, res.data.token);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.response?.data?.detail || 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
  <View style={styles.container}>
      <Image 
        source={require('../../assets/Icon.png')} 
        style={styles.icon} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Jidar to manage your property</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password (min 6 chars)" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 24 },
  icon: { width: 64, height: 64, alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#FFF', height: 56, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, marginBottom: 16 },
  button: { backgroundColor: '#00A36C', height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  linkText: { color: '#00A36C', textAlign: 'center', fontWeight: '600' }
});
