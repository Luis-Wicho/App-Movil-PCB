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