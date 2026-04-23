import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || '';

// Creamos un adaptador de almacenamiento que no truene en Web/Node
const ExpoSqliteAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Si estamos en web usamos localStorage normal, si es móvil usamos el adaptador de AsyncStorage
    storage: Platform.OS === 'web' ? (typeof window !== 'undefined' ? window.localStorage : undefined) : ExpoSqliteAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});