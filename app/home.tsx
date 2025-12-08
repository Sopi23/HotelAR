// HOTELAR/app/signin-form.tsx (The Sign In Form Page)

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// Firebase Firestore
import { collection, getDocs, query, where } from "firebase/firestore";
// Corrected path and included 'db'
import { db } from "../firebaseConfig";

const SignInFormScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Back button (returns to loginScreen.tsx)
  const handleGoBack = () => {
    router.back();
  };

  // --------------------------
  // FIRESTORE LOGIN (INSECURE - AS REQUESTED)
  // --------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Input Error", "Please enter both username and password.");
      return;
    }

    try {
      // 1. Query the 'customers' collection for the matching username
      const usersRef = collection(db, "customers");
      const q = query(usersRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Login Failed", "Username not found.");
        return;
      }

      // 2. Iterate through results (should be one result for a unique username)
      let userFound = false;
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        
        // ⚠️ INSECURE CHECK: Comparing plaintext password
        if (userData.password === password) {
          userFound = true;
          // You could save the user's non-sensitive data here (e.g., AsyncStorage)
        }
      });

      if (userFound) {
        Alert.alert("Success", "Login successful!");
        // Navigate to main app
        router.replace('/(tabs)');
      } else {
        Alert.alert("Login Failed", "Incorrect password.");
      }

    } catch (error: any) {
      console.error("Firestore Login Error:", error.message);
      Alert.alert("Login Failed", "An error occurred during login.");
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

        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Enter your username"
              autoCapitalize="none"
              textContentType="username"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              secureTextEntry
              textContentType="password"
            />
            <TouchableOpacity style={styles.forgotPasswordButton}>
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

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
                By connecting your account confirm that you agree
                with our 
            </Text>
            <TouchableOpacity onPress={() => console.log('View Terms')}>
                <Text style={styles.termsLink}> Term and Condition</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Login Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SignInFormScreen;

// --- STYLES ---
const PURPLE_PRIMARY = '#5C2D91';
const RED_ACCENT = '#D32F2F';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    paddingVertical: 0,
  },
  forgotPasswordButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  forgotPasswordText: {
    color: RED_ACCENT,
    fontSize: 14,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  termsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  termsLink: {
    color: PURPLE_PRIMARY,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomButtonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  loginButton: {
    backgroundColor: PURPLE_PRIMARY,
    paddingVertical: 18,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});