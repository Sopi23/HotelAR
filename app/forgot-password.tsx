// HOTELAR/app/forgot-password.tsx

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('johni@example.com'); 
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleConfirmMail = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      Alert.alert('Success', `Verification code sent to ${email}.`);
      
      // 2. Navigate to the verification page
      router.push('/verify-code');
      
    } catch { // FIX APPLIED HERE: Used empty catch binding to resolve the linting warning
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
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
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Image / Icon Section */}
        <View style={styles.imageContainer}>
          <Ionicons name="cloud" size={120} color={PURPLE_PRIMARY} style={styles.cloudIcon} />
          <Ionicons name="lock-closed" size={50} color="#FFD700" style={styles.lockIcon} />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <Text style={styles.instructionText}>
          Please write your email to receive a confirmation code to set a new password.
        </Text>
      </View>

      {/* Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmMail}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Confirm Mail'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

// --- STYLES ---
const PURPLE_PRIMARY = '#5C2D91';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 25,
  },
  title: { fontSize: 30, fontWeight: 'bold', color: '#333', marginTop: 10 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  cloudIcon: {
    position: 'absolute',
    opacity: 0.8,
  },
  lockIcon: {
    position: 'absolute',
    top: 50,
    right: 50,
    padding: 10,
    backgroundColor: '#FFEB3B',
    borderRadius: 10,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 40,
  },
  bottomButtonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  confirmButton: {
    backgroundColor: PURPLE_PRIMARY,
    paddingVertical: 18,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});