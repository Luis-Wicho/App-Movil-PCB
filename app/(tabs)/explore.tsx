
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  const router = useRouter();
  
  // Estados para los campos
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
        colors={['#FFFFFF', '#E0F2F1']}
        style={styles.gradientBackground}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            
            {/* Encabezado pequeño para dar espacio al formulario */}
            <View style={styles.headerSmall}>
              <Image
                source={require('@/assets/images/logo2.png')} 
                style={styles.miniLogo}
              />
              <ThemedText style={styles.headerTitle}>Crear Nueva Cuenta</ThemedText>
            </View>

            {/* Tarjeta del Formulario */}
            <View style={styles.card}>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerSmall: {
    alignItems: 'center',
    marginBottom: 30,
  },
  miniLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E838F',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10, // Sombra en Android
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  registerButton: {
    backgroundColor: '#1E838F',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1E838F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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
    color: '#64748b',
    fontSize: 15,
  },
  backTextBold: {
    color: '#1E838F',
    fontWeight: 'bold',
  },
});
