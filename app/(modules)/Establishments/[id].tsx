import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

export default function EstablishmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDetail();
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
      Alert.alert('Error', 'No se pudo cargar la información');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#1E838F" /></View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E838F" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Ficha Técnica</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título y Estatus */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.mainTitle}>{data.nombre_establecimiento}</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.label}>Expediente: {data.no_expediente}</ThemedText>
            <View style={[styles.badge, { backgroundColor: data.estatus === 'Activo' ? '#dcfce7' : '#fee2e2' }]}>
               <ThemedText style={[styles.badgeText, { color: data.estatus === 'Activo' ? '#166534' : '#991b1b' }]}>
                {data.estatus}
               </ThemedText>
            </View>
          </View>
        </View>

        {/* Tarjeta de Información Principal */}
        <View style={styles.infoCard}>
          <DetailItem icon="person" label="Propietario" value={data.nombre_propietario} />
          <DetailItem icon="business" label="Giro" value={data.giro_comercial} />
          <DetailItem icon="expand" label="Tamaño" value={data.id_tamano} />
          <DetailItem icon="location" label="Ubicación" value={data.direccion} />
        </View>

        {/* Sección de Observaciones */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Observaciones</ThemedText>
          <View style={styles.obsBox}>
            <ThemedText style={styles.obsText}>
              {data.observaciones || 'No hay observaciones adicionales registradas.'}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const DetailItem = ({ icon, label, value }: any) => (
  <View style={styles.detailRow}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={18} color="#1E838F" />
    </View>
    <View style={{ flex: 1 }}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      <ThemedText style={styles.rowValue}>{value || 'N/A'}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 16, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backButton: { padding: 4, marginRight: 12 },
  headerTitle: { color: '#1E838F', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  section: { marginBottom: 25 },
  mainTitle: { color: '#1e293b', fontSize: 22, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 },
  label: { color: '#64748b', fontSize: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  infoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rowLabel: { fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 },
  rowValue: { fontSize: 15, color: '#1e293b', fontWeight: '500', marginTop: 2 },
  sectionTitle: { fontSize: 16, color: '#1e293b', marginBottom: 12 },
  obsBox: { backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  obsText: { color: '#475569', lineHeight: 22, fontSize: 14 }
});