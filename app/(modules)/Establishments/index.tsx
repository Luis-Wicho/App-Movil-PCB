import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';

interface Establecimiento {
  id_establecimiento: string;
  nombre_establecimiento: string;
  giro_comercial: string;
  direccion: string;
  estatus: string;
  no_expediente: string;
}

export default function EstablishmentsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [filteredData, setFilteredData] = useState<Establecimiento[]>([]);
  const [search, setSearch] = useState('');

  const fetchEstablecimientos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('establecimientos') 
        .select('*')
        .order('nombre_establecimiento', { ascending: true });

      if (error) throw error;
      setEstablecimientos(data || []);
      setFilteredData(data || []); // Inicializamos los datos filtrados
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablecimientos();
  }, []);

  // Función de búsqueda en tiempo real
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = establecimientos.filter((item) => {
        const itemData = `${item.nombre_establecimiento} ${item.no_expediente}`.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(establecimientos);
    }
  };

  const renderItem = ({ item }: { item: Establecimiento }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {item.nombre_establecimiento}
        </ThemedText>
        <ThemedText style={styles.subtitle}>{item.giro_comercial}</ThemedText>
        
        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={14} color="#1E838F" />
          <ThemedText style={styles.details}>Expediente: {item.no_expediente}</ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#64748b" />
          <ThemedText style={styles.details}>{item.direccion}</ThemedText>
        </View>
      </View>

      <View style={[
        styles.statusBadge, 
        { backgroundColor: item.estatus === 'Activo' ? '#dcfce7' : '#fee2e2' }
      ]}>
        <ThemedText style={[
          styles.statusText, 
          { color: item.estatus === 'Activo' ? '#166534' : '#991b1b' }
        ]}>
          {item.estatus || 'Pendiente'}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#1E838F" />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>Establecimientos</ThemedText>
          <TouchableOpacity onPress={fetchEstablecimientos} style={styles.iconButton}>
            <Ionicons name="refresh" size={24} color="#1E838F" />
          </TouchableOpacity>
        </View>

        {/* Barra de Búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar establecimiento o expediente..."
            value={search}
            onChangeText={(text) => handleSearch(text)}
            placeholderTextColor="#94a3b8"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E838F" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_establecimiento}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>
              {search ? 'No se encontraron coincidencias.' : 'No hay datos disponibles.'}
            </ThemedText>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: { fontSize: 20, color: '#1E838F' },
  iconButton: { padding: 4 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1e293b' },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardInfo: { flex: 1 },
  title: { fontSize: 15, color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#1E838F', fontWeight: '600', marginBottom: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  details: { fontSize: 12, color: '#64748b', marginLeft: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 10 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b' }
});