import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#2980B9', '#FFFFFF']} // Azul institucional y blanco [cite: 17, 19]
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Tarjeta Blanca con Sombreado */}
          <View style={styles.loginCard}>
            
            {/* Sección del Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/logo2.png')} 
                style={styles.mainLogo}
              />
              <ThemedText style={styles.titlePrimary}>PROTECCIÓN CIVIL</ThemedText>
              <ThemedText style={styles.titleSecondary}>Y BOMBEROS</ThemedText>
              <ThemedText style={styles.locationText}>IZÚCAR DE MATAMOROS, PUE.</ThemedText>
            </View>

            {/* Sección de Botones */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => {router.push('/logeo')}}
              >
                <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => {router.push('/(tabs)/explore')}}
              >
                <ThemedText style={styles.secondaryButtonText}>Crear Cuenta</ThemedText>
              </TouchableOpacity>

            </View>

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
    padding: 20,
  },
  // Contenedor de la Tarjeta Blanca
  loginCard: {
    backgroundColor: '#FFFFFF', // Blanco [cite: 23, 30]
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    // Sombreado para iOS y Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainLogo: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  titlePrimary: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121', // Dark Charcoal [cite: 33]
    textAlign: 'center',
  },
  titleSecondary: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d33922', // Dorado institucional [cite: 24, 31]
    textAlign: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#4F4F4F', // Dark Gray [cite: 35]
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 14,
  },
  primaryButton: {
    backgroundColor: '#377123', // Azul principal [cite: 17, 27]
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Blanco [cite: 34]
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#172e9d', // Naranja [cite: 16, 27]
  },
  secondaryButtonText: {
    color: '#100f0f',
    fontSize: 16,
    fontWeight: '600',
  },
});