import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1E838F', '#E0F2F1']} // Volví al Teal para consistencia con tu logo
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
            
            {/* Tarjeta del Formulario */}
            <View style={styles.card}>
              
              {/* Elementos movidos DENTRO de la tarjeta */}
              <View style={styles.cardHeader}>
                <Image
                  source={require('@/assets/images/logo2.png')} 
                  style={styles.miniLogo}
                />
                <ThemedText style={styles.headerTitle}>Crear Nueva Cuenta</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Ingresa tus datos para continuar</ThemedText>
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nombre de Usuario</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. juan_pc"
                  placeholderTextColor="#94a3b8"
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
                style={styles.registerButton}
                onPress={() => console.log('Datos enviados:', formData)}
              >
                <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Enlace para volver */}
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
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: 'center', // Centra la tarjeta en la pantalla
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
  miniLogo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E838F',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1e293b',
  },
  registerButton: {
    backgroundColor: '#1E838F',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#1E838F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF', // Blanco para que resalte sobre el fondo azulado inferior
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});