import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons'; // Iconos estándar de Expo
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2; // Cálculo para 2 columnas con padding

export default function MainMenuScreen() {
  const menuItems = [
    { id: 1, title: 'Establecimientos', icon: 'business', color: '#2980B9' },
    { id: 2, title: 'Tarifas', icon: 'cash', color: '#93730B' },
    { id: 3, title: 'Estatus', icon: 'stats-chart', color: '#FF6600' },
    { id: 4, title: 'Mi Perfil', icon: 'person', color: '#2C3E50' },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <LinearGradient colors={['#2980B9', '#FFFFFF']} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.welcomeText}>Panel de Control</ThemedText>
          <ThemedText style={styles.subText}>PCyB Izúcar de Matamoros</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Tarjeta contenedora de botones */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.cardSub}>Visualización</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón de Ayuda o Soporte al final */}
        <TouchableOpacity style={styles.supportButton}>
          <Ionicons name="help-circle-outline" size={20} color="#93730B" />
          <ThemedText style={styles.supportText}>¿Necesitas asistencia técnica?</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    height: 180,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    padding: 20,
    paddingTop: 30,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: COLUMN_WIDTH,
    height: 160,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
  },
  cardSub: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  supportText: {
    fontSize: 14,
    color: '#93730B',
    marginLeft: 8,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});