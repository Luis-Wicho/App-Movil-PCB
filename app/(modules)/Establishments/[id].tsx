import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

// Definimos la interfaz para tener autocompletado y evitar errores de "any"
interface EstablecimientoDetalle {
  id_establecimiento: string;
  nombre_establecimiento: string;
  nombre_propietario: string;
  giro_comercial: string;
  id_tamano: string | number;
  direccion: string;
  no_expediente: string;
  estatus: string;
  observaciones: string;
}

export default function EstablishmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EstablecimientoDetalle | null>(null);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const { data: establishment, error } = await supabase
        .from('establecimientos')
        .select('*')
        .eq('id_establecimiento', id)
        .single();

      if (error) throw error;
      setData(establishment);
    } catch (error: any) {
      console.error('Error al cargar detalle:', error.message);
      Alert.alert('Error', 'No se pudo cargar la información del establecimiento');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de carga
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E838F" />
        <ThemedText style={{ marginTop: 10 }}>Cargando ficha técnica...</ThemedText>
      </View>
    );
  }

  // Validación de datos existentes
  if (!data) {
    return (
      <ThemedView style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#94a3b8" />
        <ThemedText style={{ marginTop: 10 }}>No se encontró el registro.</ThemedText>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <ThemedText style={{ color: '#1E838F', fontWeight: 'bold' }}>Regresar al listado</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E838F" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Ficha Técnica</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Sección de Título y Estatus */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.mainTitle}>{data.nombre_establecimiento}</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.label}>Expediente: {data.no_expediente}</ThemedText>
            <View style={[
              styles.badge, 
              { backgroundColor: data.estatus === 'Activo' ? '#dcfce7' : '#fee2e2' }
            ]}>
               <ThemedText style={[
                 styles.badgeText, 
                 { color: data.estatus === 'Activo' ? '#166534' : '#991b1b' }
               ]}>
                {data.estatus || 'Pendiente'}
               </ThemedText>
            </View>
          </View>
        </View>

        {/* Tarjeta de Información Detallada */}
        <View style={styles.infoCard}>
          <DetailItem icon="person-outline" label="Propietario / Responsable" value={data.nombre_propietario} />
          <DetailItem icon="briefcase-outline" label="Giro Comercial" value={data.giro_comercial} />
          <DetailItem icon="resize-outline" label="Tamaño del Local" value={data.id_tamano} />
          <DetailItem icon="location-outline" label="Dirección Completa" value={data.direccion} />
        </View>

        {/* Sección de Observaciones de Protección Civil */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Observaciones de Seguridad</ThemedText>
          <View style={styles.obsBox}>
            <ThemedText style={styles.obsText}>
              {data.observaciones || 'Sin observaciones adicionales por parte de Protección Civil.'}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Componente auxiliar para cada fila de detalle
const DetailItem = ({ icon, label, value }: { icon: any, label: string, value: any }) => (
  <View style={styles.detailRow}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={18} color="#1E838F" />
    </View>
    <View style={{ flex: 1 }}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      <ThemedText style={styles.rowValue}>{value || 'Dato no registrado'}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { 
    paddingTop: 60, 
    paddingBottom: 20, 
    paddingHorizontal: 16, 
    backgroundColor: '#fff', 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9',
    elevation: 2
  },
  backButton: { padding: 4, marginRight: 12 },
  headerTitle: { color: '#1E838F', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { marginBottom: 25 },
  mainTitle: { color: '#1e293b', fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  label: { color: '#64748b', fontSize: 14, fontWeight: '500' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  infoCard: { 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    padding: 24, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 15,
    marginBottom: 10
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#E0F2F1', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  rowLabel: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' },
  rowValue: { fontSize: 15, color: '#334155', fontWeight: '500', marginTop: 3 },
  sectionTitle: { fontSize: 16, color: '#1e293b', marginBottom: 15 },
  obsBox: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    borderStyle: 'dashed' 
  },
  obsText: { color: '#475569', lineHeight: 24, fontSize: 14, fontStyle: 'italic' }
});