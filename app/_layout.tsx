import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDB } from '../lib/db';

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return (  
    <Stack screenOptions={{ headerShown: false }}>
      
    </Stack>  );
}