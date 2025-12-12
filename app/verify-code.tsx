// HOTELAR/app/verify-code.tsx (FULLY CORRECTED)

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

// Define the type for the refs array (Required for correct TypeScript typing)
type InputRefsArray = (TextInput | null)[];

const VerifyCodeScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<InputRefsArray>([]);
  const [countdown, setCountdown] = useState(120); // 2 minutes

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) return; // Only allow one character

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus to the next input field
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if the full code is entered
    if (newCode.every(digit => digit.length === 1)) {
        Keyboard.dismiss();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    // Auto-focus to the previous input field on Backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      Alert.alert('Error', 'Please enter the full 4-digit code.');
      return;
    }
    
    // Simulate verification
    Alert.alert('Verifying...', `Code: ${fullCode}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // Navigate to the New Password screen
    router.push('/new-password');
  };
  
  const handleResendCode = () => {
      if (countdown === 0) {
          Alert.alert('Code Resent', 'A new confirmation code has been sent.');
          setCountdown(120); // Reset timer
      } else {
          Alert.alert('Wait', 'Please wait until the countdown finishes.');
      }
  };

  const formattedTime = `${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`;
  const isResendEnabled = countdown === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Verification Code</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Image / Icon Section */}
        <View style={styles.imageContainer}>
          <Ionicons name="cloud" size={120} color={PURPLE_PRIMARY} style={styles.cloudIcon} />
          <Ionicons name="lock-closed" size={50} color="#FFD700" style={styles.lockIcon} />
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              // FIX APPLIED HERE: Using block body {} to ensure the ref assignment returns void, resolving the TypeScript error 2769.
              ref={el => { inputRefs.current[index] = el; }} 
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              value={digit}
              caretHidden
            />
          ))}
        </View>
        
        {/* Resend Timer */}
        <View style={styles.resendContainer}>
            <Text style={styles.timerText}>{formattedTime}</Text>
            <TouchableOpacity onPress={handleResendCode} disabled={!isResendEnabled}>
                <Text style={[styles.resendText, !isResendEnabled && { color: '#999' }]}>
                    resend confirmation code.
                </Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmCode}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Confirm Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;

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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 70,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    color: PURPLE_PRIMARY,
    fontWeight: 'bold',
    marginRight: 5,
  },
  resendText: {
    fontSize: 16,
    color: PURPLE_PRIMARY,
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