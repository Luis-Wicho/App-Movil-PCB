import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

interface Inspeccion {
  id_inspeccion: string;
  id_establecimiento: string;
  nombre_establecimiento: string;
  fecha_inspeccion: string;
  resultado: string; 
  observaciones: string;
}

export default function StatusScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([]);

  const fetchInspecciones = async () => {
    try {
      setLoading(true);
      
      // Cambio de 'inspecciones' a 'inspeccion' (singular)
      const { data, error } = await supabase
        .from('inspeccion') 
        .select(`
          *,
          establecimientos (nombre_establecimiento)
        `)
        .order('fecha_inspeccion', { ascending: false });

      if (error) {
        console.log("Error buscando la tabla:", error.message);
        throw error;
      }

      if (data && data.length > 0) {
        // Esto te dirá los nombres reales de las columnas en F12
        console.log("Columnas encontradas en Inspección:", Object.keys(data[0]));
        
        const formatted = data.map((i: any) => ({
          ...i,
          nombre_establecimiento: i.establecimientos?.nombre_establecimiento || 'Negocio Desconocido'
        }));
        setInspecciones(formatted);
      }
      
    } catch (error: any) {
      Alert.alert('Aviso', 'No se encontró la tabla "inspeccion". Verifica el nombre con tu compañero.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspecciones();
  }, []);

  const getStatusStyle = (resultado: string) => {
    const r = resultado?.toLowerCase();
    if (r === 'aprobado' || r === 'seguro') 
      return { bg: '#dcfce7', text: '#166534', icon: 'shield-check' };
    if (r === 'pendiente' || r === 'en proceso') 
      return { bg: '#fef9c3', text: '#854d0e', icon: 'time' };
    if (r === 'riesgo' || r === 'no aprobado' || r === 'clausurado') 
      return { bg: '#fee2e2', text: '#991b1b', icon: 'warning' };
    
    return { bg: '#f1f5f9', text: '#475569', icon: 'help-circle' };
  };

  const renderItem = ({ item }: { item: Inspeccion }) => {
    const status = getStatusStyle(item.resultado);

    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <ThemedText type="defaultSemiBold" style={styles.businessTitle}>
            {item.nombre_establecimiento}
          </ThemedText>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color="#64748b" />
            <ThemedText style={styles.dateText}>
              {new Date(item.fecha_inspeccion).toLocaleDateString('es-MX')}
            </ThemedText>
          </View>
          <ThemedText numberOfLines={1} style={styles.obsText}>
            {item.observaciones || 'Sin observaciones'}
          </ThemedText>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Ionicons name={status.icon as any} size={16} color={status.text} />
          <ThemedText style={[styles.statusText, { color: status.text }]}>
            {item.resultado || 'N/A'}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#F57C00" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Inspecciones</ThemedText>
        <TouchableOpacity onPress={fetchInspecciones} style={styles.iconButton}>
          <Ionicons name="refresh" size={24} color="#F57C00" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F57C00" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={inspecciones}
          keyExtractor={(item) => item.id_inspeccion}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>No hay inspecciones registradas.</ThemedText>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: { fontSize: 20, color: '#F57C00' },
  iconButton: { padding: 4 },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  cardInfo: { flex: 1 },
  businessTitle: { fontSize: 15, color: '#1e293b' },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  dateText: { fontSize: 12, color: '#64748b', marginLeft: 5 },
  obsText: { fontSize: 12, color: '#94a3b8', marginTop: 6, fontStyle: 'italic' },
  statusBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    borderRadius: 12,
    gap: 6,
    minWidth: 100,
    justifyContent: 'center'
  },
  statusText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' }
});