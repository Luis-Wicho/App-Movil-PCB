import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Reemplaza esto con tus credenciales reales del dashboard de Supabase
const supabaseUrl = 'https://TU_PROYECTO.supabase.co';
const supabaseAnonKey = 'TU_KEY_ANONIMA_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});