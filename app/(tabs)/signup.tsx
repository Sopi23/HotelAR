// HOTELAR/app/signup.tsx (Standalone Sign Up Form Page)

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

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Firebase Firestore
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Back button
  const handleGoBack = () => {
    router.back();
  };

  // --------------------------
  // FIRESTORE SIGN UP (NO AUTH)
  // --------------------------
  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Input Error", "Please fill in username, email, and password.");
      return;
    }

    try {
      // Create custom doc ID
      const customId = Date.now().toString();

      // Save user to Firestore
      await setDoc(doc(db, "users", customId), {
        username: username,
        email: email,
        password: password, // plaintext (not secure)
        rememberMe: rememberMe,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");

      // Navigate to main app
      router.replace('/(tabs)');

    } catch (error: any) {
      console.error("Firestore Error:", error.message);
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>
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
            />
            {username.length >= 3 && (
              <MaterialIcons name="done" size={20} color="#4CAF50" />
            )}
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
            />
            {password.length > 5 && (
              <Text style={styles.passwordStrength}>Strong</Text>
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.includes('@') && (
              <MaterialIcons name="done" size={20} color="#4CAF50" />
            )}
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

      {/* Sign Up Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SignupScreen;

// --- STYLES ---
const PURPLE_PRIMARY = '#5C2D91';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
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
    alignItems: 'center',
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
  passwordStrength: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  bottomButtonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  signUpButton: {
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
