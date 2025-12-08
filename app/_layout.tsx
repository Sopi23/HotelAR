                          // HOTELAR/app/_layout.tsx 

import { Stack } from 'expo-router';

export default function RootLayout() {
   return (
 <Stack>
 {/* 1. WELCOME screen (Must be the first one listed) */}
 <Stack.Screen 
name="welcome" 
 options={{ 
 headerShown: false, 
 }} 
 />

{/* 2. THE MISSING LINK: LOGIN screen (Must be listed explicitly) */}
 <Stack.Screen 
 name="login" 
 options={{ 
headerShown: false, 
 }} 
 />

 {/* 3. The main tabs group */}
 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
 
 {/* 4. Other screens */}
 <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
</Stack>
 );
}