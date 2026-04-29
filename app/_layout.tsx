import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Configuración de notificaciones ajustada
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Solo intentamos registrar si no estamos en Expo Go o si tenemos el ID
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') return;
    
    try {
      // Intentamos obtener el token de forma segura
      // NOTA: En Expo Go SDK 53+ esto siempre fallará para notificaciones remotas
      const token = (await Notifications.getExpoPushTokenAsync({
        // Si tienes un projectId en app.json, ponlo aquí para quitar el error
        // projectId: "tu-id-de-eas" 
      })).data;
      console.log("Token:", token);
    } catch (e) {
      // Silenciamos el error en consola para que no te bloquee la pantalla
      console.warn("Notificaciones no disponibles en este entorno (Expo Go).");
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
        {/* Cambiamos el nombre para que coincida con la carpeta real (Notifications con N mayúscula) */}
        <Stack.Screen name="menu" />
        <Stack.Screen name="(modules)/Fee/index" />
        <Stack.Screen name="(modules)/Notifications/index" /> 
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}