import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert("Atención", "Ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      // Mismo dominio que el registro
      const userIdentifier = `${username.toLowerCase().trim()}@pcyb-izucar.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: userIdentifier,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        router.replace("/menu");
      }
    } catch (err: any) {
      Alert.alert("Error de acceso", "Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient colors={['#1E838F', '#E0F2F1']} style={styles.gradientBackground}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={require('@/assets/images/logo2.png')} style={styles.miniLogo} />
                <ThemedText style={styles.headerTitle}>Bienvenido</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Protección Civil e Izúcar</ThemedText>
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombre de Usuario</ThemedText>
                <TextInput style={styles.input} placeholder="Tu usuario" autoCapitalize="none" value={username} onChangeText={setUsername} />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Contraseña</ThemedText>
                <TextInput style={styles.input} placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
              </View>

              <TouchableOpacity style={[styles.loginButton, loading && { opacity: 0.7 }]} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#FFF" /> : <ThemedText style={styles.buttonText}>Entrar</ThemedText>}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push("/explore")} style={styles.registerLink}>
              <ThemedText style={styles.backText}>¿No tienes cuenta? <ThemedText style={styles.backTextBold}>Regístrate</ThemedText></ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 30, padding: 28, elevation: 12 },
  cardHeader: { alignItems: 'center', marginBottom: 25 },
  miniLogo: { width: 100, height: 100, marginBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1E838F' },
  headerSubtitle: { fontSize: 14, color: '#64748b' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 15, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  loginButton: { backgroundColor: '#1E838F', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  registerLink: { marginTop: 25, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontSize: 16 },
  backTextBold: { fontWeight: 'bold', textDecorationLine: 'underline' }
});