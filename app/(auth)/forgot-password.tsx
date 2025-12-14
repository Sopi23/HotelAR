// HOTELAR/app/(auth)/forgot-password.tsx

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Import Firebase Auth services (Assumes path '../../utils/firebaseConfig' is correct)
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const PURPLE_PRIMARY = '#5C2D91';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleGoBack = () => { router.back(); };

  const handleConfirmMail = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    
    try {
      // 1. Send the secure password reset link using Firebase Auth
      await sendPasswordResetEmail(auth, email); 

      Alert.alert(
          'Email Sent', 
          'A password reset email has been successfully triggered. Please check your inbox (and spam folder).'
      );
      
      // 2. Custom Navigation: Direct the user to the Verification Code screen 
      // (This deviates from the standard Firebase flow but matches your design)
      router.push('/(auth)/verify-code'); 
      
    } catch (error: any) {
      console.error("Password Reset Error:", error.code, error.message);
      
      let message = 'Failed to send email. Ensure the email is registered.';
      
      if (error.code === 'auth/user-not-found') {
        message = 'The email address is not registered.';
      }
      
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Forgot Password</Text>
        
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
            <Ionicons name="lock-open-outline" size={100} color={PURPLE_PRIMARY} /> 
        </View>

        {/* Form Container (Fixed: styles.formContainer added to StyleSheet.create) */}
        <View style={styles.formContainer}> 
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="johni@example.com"
            autoCapitalize="none"
          />
        </View>
        
        <Text style={styles.infoText}>
          Please write your email to receive a confirmation code to set a new password.
        </Text>

        {/* Confirm Mail Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmMail}>
          <Text style={styles.buttonText}>Confirm Mail</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { paddingHorizontal: 30, paddingVertical: 20, flexGrow: 1, justifyContent: 'center' },
  backButton: { position: 'absolute', top: 50, left: 25, zIndex: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 40, marginTop: 40 },
  imageContainer: { alignItems: 'center', marginVertical: 30 },
  
  // 🟢 FIXED: The missing style property
  formContainer: { 
    width: '100%', 
    marginBottom: 30 
  },
  
  label: { fontSize: 14, color: '#666', marginTop: 15, marginBottom: 5 },
  textInput: { fontSize: 16, color: '#333', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8 },
  infoText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 40 },
  confirmButton: { backgroundColor: PURPLE_PRIMARY, paddingVertical: 18, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});