import React, { useState, createContext, useContext } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RoleContextType = {
  currentRole: 'mother' | 'asha' | 'doctor' | 'admin' | null;
  setRole: (role: 'mother' | 'asha' | 'doctor' | 'admin' | null) => void;
};

export const RoleContext = createContext<RoleContextType>({ currentRole: null, setRole: () => {} });

export const useRole = () => useContext(RoleContext);

export default function RootLayout() {
  const [currentRole, setRole] = useState<'mother' | 'asha' | 'doctor' | 'admin' | null>(null);

  return (
    <SafeAreaProvider>
      <RoleContext.Provider value={{ currentRole, setRole }}>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(mother)" />
          <Stack.Screen name="(asha)" />
          <Stack.Screen name="(doctor)" />
          <Stack.Screen name="(admin)" />
        </Stack>
      </RoleContext.Provider>
    </SafeAreaProvider>
  );
}
