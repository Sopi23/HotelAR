// HOTELAR/app/new-password.tsx (FULLY CORRECTED)

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('HJ@#9783kja'); 
  const [confirmPassword, setConfirmPassword] = useState('HJ@#9783kja'); 
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleResetPassword = async () => {
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      // 1. Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      Alert.alert('Success', 'Your password has been reset successfully! Please log in with your new password.');
      
      // 2. Navigate the user back to the Sign-in screen (using replace to clear history)
      router.replace('/signin-form'); 
      
    } catch { // FIX APPLIED HERE: Using empty catch binding to resolve the linting warning
      Alert.alert('Error', 'Failed to reset password. Please try again.');
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
        <Text style={styles.title}>New Password</Text>
      </View>

      <View style={styles.contentContainer}>
        
        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        
        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
          />
        </View>

        <Text style={styles.instructionText}>
          Please write your new password.
        </Text>
      </View>

      {/* Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handleResetPassword}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;

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
    paddingTop: 80, // Space below title
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 40,
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
    marginTop: 100, // Push text to bottom
  },
  bottomButtonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  resetButton: {
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