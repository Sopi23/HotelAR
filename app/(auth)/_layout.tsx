// HOTELAR/app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      {/* Set options for all screens in the (auth) group */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} /> 
      <Stack.Screen name="signup" options={{ headerShown: false }} /> 
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="verify-code" options={{ headerShown: false }} />
      <Stack.Screen name="new-password" options={{ headerShown: false }} />
    </Stack>
  );
}