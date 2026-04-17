import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient'; // Importación necesaria
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Aplicamos el Gradiente como fondo principal */}
      <LinearGradient
        // Colores: Blanco puro a un Teal muy suave (#E0F2F1)
        colors={['#878787', '#ffffff']}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Sección del Logo e Identidad */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo2.png')} 
              style={styles.mainLogo}
            />
            
            <ThemedText style={styles.titlePrimary}>PROTECCIÓN CIVIL</ThemedText>
            <ThemedText style={styles.titleSecondary}>Y BOMBEROS</ThemedText>
            <ThemedText style={styles.locationText}>IZÚCAR DE MATAMOROS, PUE.</ThemedText>
          </View>

          {/* Sección de Acciones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              //onPress={() => router.push("/users/start")}
            >
              <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              //onPress={() => router.push("/users/register")}
            >
              <ThemedText style={styles.secondaryButtonText}>Crear Cuenta</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Soporte técnico')}>
              <ThemedText style={styles.helpText}>
                ¿Necesitas ayuda con tu acceso?
              </ThemedText>
            </TouchableOpacity>
          </View>

        </ScrollView>
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
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainLogo: {
    width: 170, // Un poco más grande para que luzca
    height: 170,
    marginBottom: 20,
  },
  titlePrimary: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E838F',
    letterSpacing: 1,
    textAlign: 'center',
  },
  titleSecondary: {
    fontSize: 22,
    fontWeight: '600',
    color: '#E8702D',
    marginTop: -2,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 15,
    color: '#1D1D1B',
    opacity: 0.7,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E838F',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    // Sombra para que resalte sobre el gradiente
    shadowColor: '#1E838F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fondo semi-transparente
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E838F',
  },
  secondaryButtonText: {
    color: '#1E838F',
    fontSize: 18,
    fontWeight: '600',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#546e7a',
    marginTop: 15,
  },
});