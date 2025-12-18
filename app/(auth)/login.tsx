// HOTELAR/app/(auth)/login.tsx - SECURE FIREBASE AUTH VERSION

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

// 1. Import Firebase AUTH components
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";

const PURPLE_PRIMARY = '#5C2D91';
const RED_ACCENT = '#D32F2F';

const LoginScreen = () => {
  // IMPORTANT: Login must use email for Firebase Auth
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => { router.back(); };
  const handleForgotPassword = () => { router.push('/(auth)/forgot-password'); };
  const handleSignUp = () => { router.push('/(auth)/signup'); };

  // --------------------------
  // SECURE FIREBASE AUTH LOGIN
  // --------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // **CRITICAL STEP: Sign in securely with email and password**
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // SUCCESS: User is logged in, session is established.
      Alert.alert(
        "Login Successful", 
        `Welcome! You are logged in as ${user.email}.`
      );

      // 2. NAVIGATE TO HOME PAGE (tabs)
      // This is the correct absolute path to move from the Auth stack to the Main App stack.
      router.replace('../home'); 

    } catch (error: any) {
      console.error("Firebase Login Error:", error.code, error.message);
      let message = "Login failed. Please check your network connection.";
      
      // Provide user-friendly feedback based on Firebase error codes
      if (error.code === 'auth/invalid-email') {
        message = "The email address is invalid.";
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = "Invalid email or password.";
      }

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please enter your data to continue</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Email Input (Replaces Username) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email address"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputRow, { borderBottomWidth: 0, flexDirection: 'column' }]}>
            <TextInput
              style={[styles.input, { borderBottomWidth: 1, borderBottomColor: '#CCC', marginBottom: 5 }]}
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              secureTextEntry
              textContentType="password"
            />
            <TouchableOpacity 
                style={styles.forgotPasswordButton} 
                onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Remember Me */}
        <View style={styles.switchContainer}>
          <Text style={styles.rememberMeText}>Remember me</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#6A1B9A" }}
            thumbColor={rememberMe ? "#8E24AA" : "#F4F4F4"}
            onValueChange={setRememberMe}
            value={rememberMe}
          />
        </View>
      </ScrollView>

      {/* Login Button & Sign Up Link */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.disabledButton]} 
          onPress={handleLogin} 
          activeOpacity={0.8}
          disabled={loading} // Disable while logging in
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpLinkContainer} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Don&apos;t have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

// --- STYLES --- 
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  header: { paddingHorizontal: 25, paddingVertical: 10, paddingTop: 20 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 5 }, 
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 }, 
  scrollContainer: { paddingHorizontal: 25, paddingBottom: 20 },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: '500' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', paddingVertical: 8 },
  input: { flex: 1, fontSize: 16, color: '#333', paddingVertical: 0 },
  forgotPasswordButton: { alignSelf: 'flex-end', marginTop: 5 },
  forgotPasswordText: { color: RED_ACCENT, fontSize: 14, fontWeight: '600' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  rememberMeText: { fontSize: 16, color: '#333' },
  bottomButtonContainer: { paddingHorizontal: 25, paddingBottom: 20, paddingTop: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#EEE' },
  loginButton: { backgroundColor: PURPLE_PRIMARY, paddingVertical: 18, width: '100%', borderRadius: 15, alignItems: 'center', elevation: 4 },
  disabledButton: { opacity: 0.7 }, // New style for when button is disabled
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  signUpLinkContainer: { alignItems: 'center', paddingVertical: 10 },
  signUpText: { fontSize: 16, color: '#666' },
  signUpLink: { color: PURPLE_PRIMARY, fontWeight: 'bold' },
});