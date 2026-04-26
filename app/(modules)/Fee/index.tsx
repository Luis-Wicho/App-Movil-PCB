import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

// Definimos la estructura de los datos que vienen de la base de datos
interface OrdenPago {
  id_pago: string;
  id_establecimiento: string;
  monto: number;
  fecha_emision: string;
  nombre_establecimiento?: string; 
}

export default function FeeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pagos, setPagos] = useState<OrdenPago[]>([]);

  // Función para obtener los datos de Supabase
  const fetchPagos = async () => {
    try {
      setLoading(true);
      
      // Consulta con JOIN para traer el nombre del negocio desde la tabla establecimientos
      const { data, error } = await supabase
        .from('ordenes_pago') 
        .select(`
          id_pago,
          monto,
          fecha_emision,
          id_establecimiento,
          establecimientos (nombre_establecimiento)
        `)
        .order('fecha_emision', { ascending: false });

      if (error) throw error;

      // Mapeamos los datos para que el nombre del establecimiento sea fácil de leer
      const formatted = data.map((p: any) => ({
        ...p,
        nombre_establecimiento: p.establecimientos?.nombre_establecimiento || 'Negocio no identificado'
      }));

      setPagos(formatted);
    } catch (error: any) {
      console.error("Error en Supabase:", error.message);
      Alert.alert('Error', 'No se pudieron cargar los registros de cobro.');
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al abrir la pantalla
  useEffect(() => {
    fetchPagos();
  }, []);

  // Cómo se ve cada tarjeta de pago en la lista
  const renderItem = ({ item }: { item: OrdenPago }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <ThemedText type="defaultSemiBold" style={styles.businessName}>
          {item.nombre_establecimiento}
        </ThemedText>
        <ThemedText style={styles.dateText}>
          Emitida: {item.fecha_emision ? new Date(item.fecha_emision).toLocaleDateString('es-MX') : 'Sin fecha'}
        </ThemedText>
        <View style={styles.amountRow}>
          <ThemedText style={styles.currency}>$</ThemedText>
          <ThemedText style={styles.amount}>{(item.monto || 0).toLocaleString()}</ThemedText>
        </View>
      </View>
      <View style={styles.iconCircle}>
        <Ionicons name="receipt" size={24} color="#2E7D32" />
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Encabezado con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Tarifas y Pagos</ThemedText>
        <TouchableOpacity onPress={fetchPagos} style={styles.iconButton}>
          <Ionicons name="refresh" size={26} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Tarjeta de Resumen Financiero */}
      <View style={styles.summaryCard}>
        <ThemedText style={styles.summaryLabel}>Total Recaudado (Caja)</ThemedText>
        <ThemedText style={styles.summaryTotal}>
          ${pagos.reduce((acc, curr) => acc + (curr.monto || 0), 0).toLocaleString()}
        </ThemedText>
      </View>

      {/* Listado o Cargando */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <ThemedText style={styles.loadingText}>Cargando registros...</ThemedText>
        </View>
      ) : (
        <FlatList
          data={pagos}
          keyExtractor={(item) => item.id_pago}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Ionicons name="alert-circle-outline" size={50} color="#94a3b8" />
              <ThemedText style={styles.emptyText}>No hay órdenes de pago registradas.</ThemedText>
            </View>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  headerTitle: { fontSize: 22, color: '#2E7D32', fontWeight: 'bold' },
  iconButton: { padding: 8 },
  summaryCard: {
    margin: 20,
    padding: 25,
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  summaryLabel: { color: '#E8F5E9', fontSize: 14, opacity: 0.9 },
  summaryTotal: { color: '#FFFFFF', fontSize: 34, fontWeight: 'bold', marginTop: 5 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardInfo: { flex: 1 },
  businessName: { fontSize: 16, color: '#1e293b', marginBottom: 4 },
  dateText: { fontSize: 13, color: '#64748b' },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  currency: { fontSize: 16, color: '#2E7D32', fontWeight: 'bold' },
  amount: { fontSize: 22, color: '#2E7D32', fontWeight: 'bold', marginLeft: 3 },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  loadingText: { marginTop: 10, color: '#64748b' },
  emptyText: { textAlign: 'center', marginTop: 10, color: '#94a3b8', fontSize: 16 }
});