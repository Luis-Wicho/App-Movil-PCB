import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

// 1. Definimos la interfaz con las columnas reales que encontramos
interface OrdenPago {
  id_pago: string;
  id_establecimiento: string;
  monto: number;
  fecha_emision: string;
  nombre_establecimiento?: string; // Para el join
}

export default function FeeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pagos, setPagos] = useState<OrdenPago[]>([]);

  const fetchPagos = async () => {
    try {
      setLoading(true);
      
      // Realizamos la consulta con el JOIN para traer el nombre del negocio
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

      // Formateamos para que el nombre sea fácil de acceder
      const formatted = data.map((p: any) => ({
        ...p,
        nombre_establecimiento: p.establecimientos?.nombre_establecimiento || 'Negocio no identificado'
      }));

      setPagos(formatted);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los pagos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const renderItem = ({ item }: { item: OrdenPago }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <ThemedText type="defaultSemiBold" style={styles.businessName}>
          {item.nombre_establecimiento}
        </ThemedText>
        <ThemedText style={styles.dateText}>
          Emitida: {new Date(item.fecha_emision).toLocaleDateString('es-MX')}
        </ThemedText>
        <View style={styles.amountRow}>
          <ThemedText style={styles.currency}>$</ThemedText>
          <ThemedText style={styles.amount}>{item.monto.toLocaleString()}</ThemedText>
        </View>
      </View>
      <Ionicons name="receipt-outline" size={24} color="#2E7D32" />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Pagos Recaudados</ThemedText>
        <TouchableOpacity onPress={fetchPagos} style={styles.iconButton}>
          <Ionicons name="refresh" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Resumen para tu reporte financiero */}
      <View style={styles.summaryCard}>
        <ThemedText style={styles.summaryLabel}>Total en Caja</ThemedText>
        <ThemedText style={styles.summaryTotal}>
          ${pagos.reduce((acc, curr) => acc + curr.monto, 0).toLocaleString()}
        </ThemedText>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={pagos}
          keyExtractor={(item) => item.id_pago}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>No hay registros de pago aún.</ThemedText>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 20, color: '#2E7D32' },
  iconButton: { padding: 4 },
  summaryCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    elevation: 4,
  },
  summaryLabel: { color: '#E8F5E9', fontSize: 14 },
  summaryTotal: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardInfo: { flex: 1 },
  businessName: { fontSize: 15, color: '#1e293b' },
  dateText: { fontSize: 12, color: '#64748b', marginTop: 2 },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8 },
  currency: { fontSize: 14, color: '#2e7d32', fontWeight: 'bold' },
  amount: { fontSize: 20, color: '#2e7d32', fontWeight: 'bold', marginLeft: 2 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' }
});