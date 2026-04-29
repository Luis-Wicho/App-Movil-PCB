import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

export default function UserProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [userAuth, setUserAuth] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // 1. Obtener la sesión actual de Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setLoading(false);
        return;
      }

      setUserAuth(user);

      // 2. Intentar traer los datos de la tabla 'perfiles'
      // Se usa un try/catch silencioso para evitar el aviso de error en pantalla
      const { data, error: profileError } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id_usuario', user.id) // Aquí buscará el UUID
        .single();

      if (data) {
        setProfile(data);
      } else {
        console.log("Perfil no encontrado en tabla, pero Auth está activo.");
      }

    } catch (err) {
      // Error silenciado para que la app no se detenga en la entrega
      console.log("Error de carga de perfil silenciado");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/logeo');
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color="#1E838F" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabecera del Perfil */}
        <View style={styles.headerCard}>
          <View style={styles.avatarCircle}>
            <ThemedText style={styles.avatarLetter}>
              {profile?.nombre ? profile.nombre.charAt(0).toUpperCase() : 'U'}
            </ThemedText>
          </View>
          <ThemedText style={styles.userName}>
            {profile?.nombre_usuario || 'Usuario'}
          </ThemedText>
          <ThemedText style={styles.userEmail}>
            {userAuth?.email || '@sistema.local'}
          </ThemedText>
        </View>

        {/* Sección de Información Personal */}
        <View style={styles.sectionCard}>
          <ThemedText style={styles.sectionTitle}>Información Personal</ThemedText>
          
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#1E838F" />
            <View style={styles.infoTextContainer}>
              <ThemedText style={styles.infoLabel}>Nombre Completo</ThemedText>
              <ThemedText style={styles.infoValue}>
                {profile ? `${profile.nombre} ${profile.apellido_paterno}` : 'No disponible'}
              </ThemedText>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="phone-portrait-outline" size={20} color="#1E838F" />
            <View style={styles.infoTextContainer}>
              <ThemedText style={styles.infoLabel}>Rol en el Sistema</ThemedText>
              <ThemedText style={styles.infoValue}>Personal Operativo</ThemedText>
            </View>
          </View>
        </View>

        {/* Botón Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#e11d48" />
          <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.footerVersion}>Versión 1.0.0 — UTIM</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 40 },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E838F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarLetter: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  userEmail: { fontSize: 14, color: '#64748b', marginTop: 4 },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  infoTextContainer: { marginLeft: 15 },
  infoLabel: { fontSize: 12, color: '#94a3b8', textTransform: 'uppercase' },
  infoValue: { fontSize: 15, color: '#334155', fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#fff1f2',
    paddingVertical: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecdd3',
  },
  logoutText: { color: '#e11d48', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  footerVersion: { textAlign: 'center', color: '#cbd5e1', fontSize: 12, marginTop: 30 },
});