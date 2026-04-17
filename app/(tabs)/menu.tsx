import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image'; // Importación para el logo
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 2; // Ajuste de espacio entre columnas

export default function MainMenuScreen() {
  const menuItems = [
    { id: 1, title: 'Establecimientos', icon: 'business', color: '#2980B9', sub: 'Gestionar registros' },
    { id: 2, title: 'Tarifas', icon: 'cash', color: '#93730B', sub: 'Consultar costos' },
    { id: 3, title: 'Estatus', icon: 'shield-checkmark', color: '#FF6600', sub: 'Verificar trámites' },
    { id: 4, title: 'Mi Perfil', icon: 'person', color: '#2C3E50', sub: 'Configuración' },
  ];

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header con Logo y Gradiente */}
      <LinearGradient 
        colors={['#2980B9', '#1A5276']} 
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <Image
            source={require('@/assets/images/logo2.png')} 
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.headerTextContainer}>
            <ThemedText style={styles.welcomeText}>Panel Principal</ThemedText>
            <ThemedText style={styles.subText}>PCyB Izúcar de Matamoros</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.sectionTitle}>Servicios Disponibles</ThemedText>
        
        {/* Cuadrícula de Menú */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              activeOpacity={0.8}
            >
              {/* Círculo de fondo suave para el icono */}
              <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={30} color={item.color} />
              </View>
              
              <View style={styles.cardInfo}>
                <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.cardSubText}>{item.sub}</ThemedText>
              </View>
              
              {/* Indicador visual pequeño */}
              <View style={[styles.indicator, { backgroundColor: item.color }]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Soporte Técnico */}
        <TouchableOpacity style={styles.supportCard}>
          <View style={styles.supportContent}>
            <Ionicons name="help-circle" size={24} color="#93730B" />
            <ThemedText style={styles.supportText}>¿Necesitas asistencia técnica?</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#93730B" />
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    marginLeft: 5,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: COLUMN_WIDTH,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start', // Alineación a la izquierda para un look más moderno
    position: 'relative',
    overflow: 'hidden',
    // Sombras sutiles
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardInfo: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  cardSubText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  indicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF9E7',
    padding: 18,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F9E79F',
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    fontSize: 14,
    color: '#93730B',
    marginLeft: 10,
    fontWeight: '600',
  },
});