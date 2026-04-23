import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  async function handleRegister() {
    const { username, firstName, lastName, password, confirmPassword } = formData;

    if (!username || !firstName || !lastName || !password) {
      Alert.alert("Campos vacíos", "Por favor rellena todos los datos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const fakeEmail = `${username.toLowerCase().trim()}@pcyb-izucar.com`;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: fakeEmail,
      password: password,
    });

    if (authError) {
      Alert.alert("Error de Registro", authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert([
          {
            id: authData.user.id,
            username: username,
            first_name: firstName,
            last_name: lastName,
          }
        ]);

      if (profileError) {
        Alert.alert("Error de Perfil", "Error al guardar nombres: " + profileError.message);
      } else {
        Alert.alert("¡Bienvenido!", "Cuenta creada exitosamente.");
        router.replace('/menu');
      }
    }
    setLoading(false);
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient colors={['#1E838F', '#E0F2F1']} style={styles.gradientBackground}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={require('@/assets/images/logo2.png')} style={styles.miniLogo} />
                <ThemedText style={styles.headerTitle}>Crear Nueva Cuenta</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Ingresa tus datos para continuar</ThemedText>
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombre de Usuario</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. luis_izucar"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  onChangeText={(text) => setFormData({...formData, username: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombres</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Tus nombres"
                  placeholderTextColor="#94a3b8"
                  onChangeText={(text) => setFormData({...formData, firstName: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Apellidos</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Tus apellidos"
                  placeholderTextColor="#94a3b8"
                  onChangeText={(text) => setFormData({...formData, lastName: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Contraseña</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  onChangeText={(text) => setFormData({...formData, password: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Confirmar Contraseña</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                />
              </View>

              <TouchableOpacity 
                style={[styles.registerButton, loading && { opacity: 0.7 }]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#FFF" /> : <ThemedText style={styles.buttonText}>Registrarse</ThemedText>}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <ThemedText style={styles.backText}>
                ¿Ya tienes cuenta? <ThemedText style={styles.backTextBold}>Inicia sesión</ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 30, padding: 28, elevation: 12 },
  cardHeader: { alignItems: 'center', marginBottom: 25 },
  miniLogo: { width: 90, height: 90, marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E838F', textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4, textAlign: 'center' },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 8, marginLeft: 4 },
  input: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 15, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#1e293b' },
  registerButton: { backgroundColor: '#1E838F', paddingVertical: 18, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  backLink: { marginTop: 25, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontSize: 16 },
  backTextBold: { fontWeight: 'bold', textDecorationLine: 'underline' },
});