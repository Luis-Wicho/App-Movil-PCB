import { Ionicons } from '@expo/vector-icons'; // Para los iconos
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function MenuScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    } else {
      // El _layout.tsx detectará el cambio y te mandará al login
      router.replace('/logeo');
    }
  };

  const menuItems = [
    { 
      title: 'Establecimientos', 
      icon: 'business', 
      color: '#1E838F', 
      // Antes: '/(modules)/Establishments' -> Ahora: '/Establishments'
      route: '/Establishments' 
    },
    { 
      title: 'Órdenes de Pago', 
      icon: 'cash', 
      color: '#2E7D32', 
      route: '/Fee' 
    },
    { 
      title: 'Inspecciones', 
      icon: 'clipboard', 
      color: '#F57C00', 
      route: '/Status' 
    },
    { 
      title: 'Mi Perfil', 
      icon: 'person', 
      color: '#455A64', 
      route: '/User' 
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <LinearGradient colors={['#1E838F', '#E0F2F1']} style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.welcomeText}>Panel de Control</ThemedText>
          <ThemedText style={styles.subText}>Protección Civil Izúcar</ThemedText>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuCard}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={32} color="white" />
            </View>
            <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Versión 1.0.0 - UTIM</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: { flex: 1 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subText: { fontSize: 16, color: '#E0F2F1', marginTop: 4 },
  logoutButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 12 },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  menuCard: {
    backgroundColor: 'white',
    width: '46%',
    aspectRatio: 1,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#334155', textAlign: 'center' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: '#94a3b8', fontSize: 12 },
});