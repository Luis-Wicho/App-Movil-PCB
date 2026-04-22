import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1E838F', '#E0F2F1']}
        style={styles.gradientBackground}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
          >
            
            {/* Tarjeta de Inicio de Sesión */}
            <View style={styles.card}>
              
              <View style={styles.cardHeader}>
                <Image
                  source={require('@/assets/images/logo2.png')} 
                  style={styles.miniLogo}
                />
                <ThemedText style={styles.headerTitle}>Bienvenido</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Inicia sesión para continuar</ThemedText>
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombre de Usuario</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Tu usuario"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  onChangeText={setUsername}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Contraseña</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => {
                  console.log('Login con:', username, password);
                  // Aquí iría tu lógica de autenticación
                  router.replace("/menu"); // Redirige al inicio de la app tras logear
                }}
              >
                <ThemedText style={styles.buttonText}>Entrar</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => alert('Recuperar contraseña')} style={{ marginTop: 15 }}>
                <ThemedText style={styles.forgotText}>¿Olvidaste tu contraseña?</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Enlace para ir a registro si no tiene cuenta */}
            <TouchableOpacity onPress={() => router.push("/explore")} style={styles.registerLink}>
              <ThemedText style={styles.backText}>
                ¿No tienes cuenta? <ThemedText style={styles.backTextBold}>Regístrate</ThemedText>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  miniLogo: { width: 100, height: 100, marginBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1E838F' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#1E838F',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  forgotText: { textAlign: 'center', color: '#64748b', fontSize: 14 },
  registerLink: { marginTop: 25, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontSize: 16 },
  backTextBold: { fontWeight: 'bold', textDecorationLine: 'underline' },
});