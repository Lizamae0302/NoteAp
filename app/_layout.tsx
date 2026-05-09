import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDB } from './database/db';

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#f4511e' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'MemoPad' }} />
      <Stack.Screen name="notes" options={{ title: 'My Note Task' }} />
      <Stack.Screen name="detail" options={{ title: 'Note' }} />
      <Stack.Screen name="add" options={{ title: 'New Note Task' }} />
    </Stack>
  );
}