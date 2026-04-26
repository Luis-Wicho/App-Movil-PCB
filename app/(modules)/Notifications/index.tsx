import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

// Estructura de los avisos
interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  tipo: 'alerta' | 'info' | 'pago';
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Intentamos traer datos de tu tabla
      const { data, error } = await supabase
        .from('notificaciones') 
        .select('*')
        .order('fecha', { ascending: false });

      if (error) throw error;

      setNotificaciones(data || []);
    } catch (error: any) {
      console.log("Aviso: Usando datos de prueba mientras configuras la tabla.");
      // Datos de ejemplo para que no se vea vacío el panel
      setNotificaciones([
        { 
          id: '1', 
          titulo: 'Actualización de Tarifas', 
          mensaje: 'Se han cargado los nuevos montos para establecimientos comerciales 2026.', 
          fecha: new Date().toISOString(), 
          leido: false, 
          tipo: 'info' 
        },
        { 
          id: '2', 
          titulo: 'Alerta de Revisión', 
          mensaje: 'Falta completar el reporte de seguridad del sector centro.', 
          fecha: new Date().toISOString(), 
          leido: true, 
          tipo: 'alerta' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }: { item: Notificacion }) => (
    <View style={[styles.card, !item.leido && styles.unreadCard]}>
      <View style={[styles.iconBox, { backgroundColor: item.tipo === 'alerta' ? '#fee2e2' : '#e0f2f1' }]}>
        <Ionicons 
          name={item.tipo === 'alerta' ? 'warning' : 'notifications-outline'} 
          size={24} 
          color={item.tipo === 'alerta' ? '#ef4444' : '#1E838F'} 
        />
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultSemiBold" style={styles.title}>{item.titulo}</ThemedText>
          {!item.leido && <View style={styles.unreadDot} />}
        </View>
        <ThemedText style={styles.message} numberOfLines={2}>{item.mensaje}</ThemedText>
        <ThemedText style={styles.date}>
          {new Date(item.fecha).toLocaleDateString('es-MX', { 
            day: '2-digit', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Barra superior */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#1E838F" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerText}>Notificaciones</ThemedText>
        <TouchableOpacity onPress={fetchNotifications} style={styles.backButton}>
          <Ionicons name="refresh" size={22} color="#1E838F" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E838F" />
        </View>
      ) : (
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>No hay avisos por ahora.</ThemedText>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  headerBar: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  headerText: { fontSize: 22, color: '#1E838F', fontWeight: 'bold' },
  backButton: { padding: 5 },
  listPadding: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  unreadCard: {
    borderColor: '#1E838F',
    backgroundColor: '#f0f9fa',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, color: '#1e293b' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1E838F' },
  message: { fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 18 },
  date: { fontSize: 11, color: '#94a3b8', marginTop: 10, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 60, color: '#94a3b8', fontSize: 16 }
});