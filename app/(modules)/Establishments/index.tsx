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
      setFilteredData(data || []);
    } catch (error: any) {
      console.error("Error Supabase:", error.message);
      Alert.alert('Error', 'No se pudo conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablecimientos();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const query = text.toUpperCase().trim();
    if (query) {
      const newData = establecimientos.filter((item) => {
        const itemData = `${item.nombre_establecimiento} ${item.no_expediente}`.toUpperCase();
        return itemData.includes(query);
      });
      setFilteredData(newData);
    } else {
      setFilteredData(establecimientos);
    }
  };

  const renderItem = ({ item }: { item: Establecimiento }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/(modules)/Establishments/${item.id_establecimiento}`)}
    >
      {/* 1. SECCIÓN DE TEXTO (IZQUIERDA) */}
      <View style={styles.textContainer}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {item.nombre_establecimiento}
        </ThemedText>
        
        <ThemedText style={styles.giroText} numberOfLines={1}>
          {item.giro_comercial || 'GIRO NO ESPECIFICADO'}
        </ThemedText>

        <View style={styles.metaRow}>
          <Ionicons name="document-text" size={14} color="#1E838F" />
          <ThemedText style={styles.metaText}>Exp: {item.no_expediente}</ThemedText>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location" size={14} color="#94a3b8" />
          <ThemedText style={styles.metaText} numberOfLines={1}>
            {item.direccion || 'Sin dirección'}
          </ThemedText>
        </View>
      </View>

      {/* 2. SECCIÓN DE ESTATUS (DERECHA) */}
      <View style={styles.sideContainer}>
        <View style={[
          styles.badge, 
          { backgroundColor: item.estatus?.toLowerCase().includes('invitacion') ? '#ffedd5' : 
                            item.estatus === 'Activo' ? '#dcfce7' : '#fee2e2' }
        ]}>
          <ThemedText style={[
            styles.badgeText,
            { color: item.estatus?.toLowerCase().includes('invitacion') ? '#9a3412' : 
                     item.estatus === 'Activo' ? '#166534' : '#991b1b' }
          ]} numberOfLines={2}>
            {item.estatus || 'PENDIENTE'}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#cbd5e1" style={{marginTop: 10}} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1E838F" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Establecimientos</ThemedText>
          <TouchableOpacity onPress={fetchEstablecimientos}>
            <Ionicons name="refresh" size={24} color="#1E838F" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.input}
            placeholder="Buscar por nombre o expediente..."
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E838F" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_establecimiento}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ThemedText style={styles.empty}>No hay resultados</ThemedText>}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 20, 
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0F172A' },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    paddingHorizontal: 15, 
    borderRadius: 15, 
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  input: { flex: 1, marginLeft: 10, fontSize: 14 },
  list: { padding: 15 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between', // Fuerza la separación entre texto y botón
    elevation: 2,
  },
  textContainer: {
    flex: 1, // Esto es lo que evita que el texto se desborde
    paddingRight: 10,
  },
  sideContainer: {
    width: 100, // Ancho fijo para el área del badge
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 15, 
    fontWeight: '800', 
    color: '#1E293B', 
    lineHeight: 20,
    textTransform: 'uppercase'
  },
  giroText: { fontSize: 11, color: '#1E838F', fontWeight: 'bold', marginVertical: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  metaText: { fontSize: 12, color: '#64748B', marginLeft: 5, flex: 1 },
  badge: { 
    paddingVertical: 5, 
    paddingHorizontal: 8, 
    borderRadius: 10, 
    width: '100%',
    alignItems: 'center'
  },
  badgeText: { fontSize: 9, fontWeight: '900', textAlign: 'center' },
  loader: { flex: 1, justifyContent: 'center' },
  empty: { textAlign: 'center', marginTop: 50, color: '#94A3B8' }
});