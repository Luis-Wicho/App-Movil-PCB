import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function MenuScreen() {
  const router = useRouter();
  
  // Estados para los datos reales de Supabase
  const [estCount, setEstCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);
  const [tarifasCount, setTarifasCount] = useState(0);

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const fetchRealData = async () => {
    try {
      // 1. Contar establecimientos
      const { count: totalEst } = await supabase
        .from('establecimientos')
        .select('*', { count: 'exact', head: true });
      if (totalEst !== null) setEstCount(totalEst);

      // 2. Contar mensajes no leídos
      const { count: totalMsg } = await supabase
        .from('notificaciones')
        .select('*', { count: 'exact', head: true })
        .eq('leido', false);
      if (totalMsg !== null) setMsgCount(totalMsg);

      // 3. Contar tarifas registradas (Módulo de Gestión de Tarifas)
      const { count: totalTarifas } = await supabase
        .from('tarifas') // Asegúrate de que el nombre de la tabla sea correcto
        .select('*', { count: 'exact', head: true });
      if (totalTarifas !== null) setTarifasCount(totalTarifas);

    } catch (error) {
      console.error("Error al obtener datos de Supabase:", error);
    }
  };

  useEffect(() => {
    fetchRealData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    } else {
      router.replace('/logeo');
    }
  };

  const menuItems = [
    { 
      title: 'ESTABLECIMIENTOS', 
      subtitle: `${estCount} registrados`,
      icon: 'business', 
      color: '#1E838F', 
      route: '/(modules)/Establishments' 
    },
    { 
      title: 'TARIFAS', 
      subtitle: `${tarifasCount} vigentes`, // Ahora es un dato real
      icon: 'cash', 
      color: '#2E7D32', 
      route: '/(modules)/Fee' 
    },
    { 
      title: 'MENSAJES', 
      subtitle: `${msgCount} nuevos`,
      icon: 'notifications', 
      color: '#7600f5', 
      route: '/(modules)/Notifications' 
    },
    { 
      title: 'MI PERFIL', 
      subtitle: 'Configuración',
      icon: 'person', 
      color: '#455A64', 
      route: '/(modules)/User' 
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <LinearGradient colors={['#1E838F', '#1565C0']} style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.welcomeText}>Panel de Control</ThemedText>
          <ThemedText style={styles.subText}>Protección Civil Izúcar</ThemedText>
          <ThemedText style={styles.dateText}>{getFormattedDate()}</ThemedText>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.menuGrid} showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.menuCard, { backgroundColor: item.color }]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.cardTop}>
              <View style={styles.miniIconContainer}>
                <Ionicons name={item.icon as any} size={24} color="white" />
              </View>
              <Ionicons name="chevron-forward" size={16} color="white" style={{ opacity: 0.7 }} />
            </View>

            <View>
              <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.cardSubtitle}>{item.subtitle}</ThemedText>
            </View>
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
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
  },
  headerContent: { flex: 1 },
  welcomeText: { fontSize: 20, color: 'white', opacity: 0.8 },
  subText: { fontSize: 22, color: '#FFFFFF', fontWeight: 'bold' },
  dateText: { fontSize: 14, color: '#E0F2F1', marginTop: 4, textTransform: 'capitalize' },
  logoutButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 15 },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    paddingTop: 25,
  },
  menuCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  miniIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '800', color: 'white', marginBottom: 2 },
  cardSubtitle: { fontSize: 11, color: 'white', opacity: 0.85 },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
});