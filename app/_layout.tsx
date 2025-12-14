// HOTELAR/app/_layout.tsx (Root Layout - FINAL FLOW CONFIGURATION)

import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* 1. Initial Screen: The 'explore' page. This is the first thing the user sees. */}
      <Stack.Screen 
        name="explore" 
        options={{ headerShown: false }} 
      />
      
      {/* 2. Authentication Group: Accessed after clicking 'Explore' */}
      <Stack.Screen 
        name="(auth)" 
        options={{ headerShown: false }} 
      />
      
      {/* 3. Main App Group: Accessed after successful Login */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      
      {/* 4. Other Global Modal Screens (like Privacy & Security, Help Center) */}
      <Stack.Screen 
        name="privacy-security" 
        options={{ headerShown: false, presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="help-center" 
        options={{ headerShown: false, presentation: 'modal' }} 
      />
      
    </Stack>
  );
}