// HOTELAR/app/(auth)/verify-code.tsx - FINAL CORRECTED VERSION

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

// Import Firebase Auth services to handle the "Resend" logic
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const PURPLE_PRIMARY = '#5C2D91';
const RESEND_TIMEOUT = 60; // 60 seconds timer

const VerificationCodeScreen = () => {
    // State for the 4 individual code inputs
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef<TextInput[]>([]);
    
    // Timer State
    const [timer, setTimer] = useState(RESEND_TIMEOUT);
    const [isCounting, setIsCounting] = useState(true);
    // ⚠️ Placeholder: In a real app, you must pass the user's email 
    // from forgot-password.tsx via router parameters.
    const emailRef = useRef('testuser@example.com'); 

    // --- TIMER LOGIC ---
    useEffect(() => {
        if (!isCounting) return;

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    setIsCounting(false);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isCounting]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // --- INPUT HANDLERS ---
    const handleChangeCode = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto-focus to the next input field
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleConfirmCode = () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
             Alert.alert('Verification Successful', 'Code accepted! Moving to set a new password.');
             router.push('/(auth)/new-password'); 
        } else {
             Alert.alert('Error', 'Please enter the full 4-digit code.');
        }
    };

    // --- RESEND LOGIC (Fixes Email Not Sending on Resend) ---
    const handleResendCode = async () => {
        if (isCounting) return; // Do nothing if timer is running

        setIsCounting(true);
        setTimer(RESEND_TIMEOUT);
        
        try {
            // FIX: Call the correct Firebase function to re-trigger the email
            await sendPasswordResetEmail(auth, emailRef.current);
            Alert.alert("Code Resent", "A new password reset link has been successfully sent.");
        } catch (error: any) {
            console.error("Resend Error:", error.code, error.message);
            Alert.alert("Error", "Could not resend code. Please ensure the email is correct and registered.");
        }
    };
    
    // --- NAVIGATION FIX ---
    const handleGoBack = () => {
        Keyboard.dismiss(); // Dismiss keyboard for smoother transition
        router.back();
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button Fix: Now uses handleGoBack */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Verification Code</Text>
            </View>

            {/* Image Fix: Visible styled icon */}
            <View style={styles.imageContainer}>
                <View style={styles.imageCircle}>
                    <Ionicons name="lock-closed" size={50} color="white" />
                </View>
            </View>

            <View style={styles.codeContainer}>
                {code.map((value, index) => (
                    <TextInput
                        key={index}
                        style={styles.codeInput}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(text) => handleChangeCode(text, index)}
                        value={value}
                        // FIX: Corrected the ref callback (TypeScript fix)
                        ref={(ref) => {
                            inputs.current[index] = ref as TextInput;
                        }}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !value && index > 0) {
                                inputs.current[index - 1]?.focus();
                            }
                        }}
                    />
                ))}
            </View>
            
            {/* Timer Fix: Working Timer and Resend Logic */}
            <Text style={styles.resendText}>
                {isCounting ? (
                    <>
                        {formatTime(timer)} 
                        <Text style={styles.resendLink}> resend confirmation code.</Text>
                    </>
                ) : (
                    <>
                        Didn&apos;t receive a code?{' '}
                        <TouchableOpacity onPress={handleResendCode} disabled={isCounting}>
                            <Text style={styles.resendLink}>Resend Now</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Text>

            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity 
                    style={styles.confirmButton} 
                    onPress={handleConfirmCode}
                >
                    <Text style={styles.buttonText}>Confirm Code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VerificationCodeScreen;

// --- STYLES ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    backButton: { position: 'absolute', top: 50, left: 25, zIndex: 10 },
    header: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    imageContainer: { alignItems: 'center', marginVertical: 30 },
    imageCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: PURPLE_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    codeContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 30 },
    codeInput: { 
        width: 50, 
        height: 60, 
        borderWidth: 1, 
        borderColor: '#CCC', 
        borderRadius: 10, 
        textAlign: 'center', 
        fontSize: 24, 
        marginHorizontal: 10, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 2, 
        backgroundColor: 'white' 
    },
    resendText: { textAlign: 'center', fontSize: 14, color: '#666', marginTop: 20 },
    resendLink: { color: PURPLE_PRIMARY, fontWeight: 'bold' },
    bottomButtonContainer: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 30, paddingBottom: 20 },
    confirmButton: { backgroundColor: PURPLE_PRIMARY, paddingVertical: 18, borderRadius: 15, alignItems: 'center', width: '100%' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});