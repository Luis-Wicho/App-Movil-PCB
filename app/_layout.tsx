import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Configuración corregida para evitar el error de TypeScript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Se mantiene por compatibilidad
    shouldPlaySound: true,
    shouldSetBadge: false,
    // Añadimos estas dos para cumplir con el nuevo tipo 'NotificationBehavior'
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Fallo al obtener el token');
        return;
      }
      
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Token para REQM12:", token);
      } catch (e) {
        console.log("Error de token:", e);
      }
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#1E838F',
      });
    }
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="logeo" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="(modules)/Fee/index" />
        <Stack.Screen name="(modules)/notifications/index" />
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
