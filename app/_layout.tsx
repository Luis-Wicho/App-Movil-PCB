import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// 1. Eliminamos unstable_settings porque ya no usaremos (tabs)

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 2. Definimos las pantallas principales del flujo de Protección Civil */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="logeo" />
        <Stack.Screen name="explore" /> 
        <Stack.Screen name="menu" />
        
        {/* El modal se queda igual por si lo necesitas después */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Aviso' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}


/*import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase'; // Tu conexión

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Escuchamos cualquier cambio en la sesión (Login, Logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      
      // Revisamos si estamos en las pantallas de "afuera" (Login/Registro/Bienvenida)
      const inAuthGroup = segments[0] === 'logeo' || segments[0] === 'explore' || segments[0] === 'index';

      if (!session && !inAuthGroup) {
        // Si NO hay sesión y el usuario intenta entrar a algo privado (como menu)
        router.replace('/logeo');
      } else if (session && inAuthGroup) {
        // Si SÍ hay sesión y el usuario está en el login, lo mandamos directo al menú
        router.replace('/menu');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="logeo" />
        <Stack.Screen name="explore" /> 
        <Stack.Screen name="menu" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Aviso' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}*/
