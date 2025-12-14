// HOTELAR/app/(auth)/new-password.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const PURPLE_PRIMARY = '#5C2D91';

const NewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordReset = () => {
        // Input Validation Checks
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // ⚠️ Placeholder for actual secure Firebase reset logic ⚠️
        
        Alert.alert('Success', 'Your password has been reset successfully!');
        
        // Navigate back to the login page to sign in with the new password
        router.replace('/(auth)/login'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>New Password</Text>
            </View>

            <View style={styles.formContainer}>
                
                {/* Password Input */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter your new password"
                />

                {/* Confirm Password Input */}
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.textInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder="Confirm your new password"
                />

            </View>

            <Text style={styles.infoText}>
                Please write your new password.
            </Text>

            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity 
                    style={styles.resetButton} 
                    onPress={handlePasswordReset}
                >
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NewPasswordScreen;

// --- STYLES ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    backButton: { position: 'absolute', top: 50, left: 25, zIndex: 10 },
    header: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    formContainer: { width: '100%', paddingHorizontal: 30, marginTop: 20 },
    label: { fontSize: 14, color: '#666', marginTop: 30, marginBottom: 5 },
    textInput: { fontSize: 16, color: '#333', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8 },
    infoText: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 40, marginBottom: 40 },
    bottomButtonContainer: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 30, paddingBottom: 20 },
    resetButton: { 
        backgroundColor: PURPLE_PRIMARY, 
        paddingVertical: 18, 
        borderRadius: 15, 
        alignItems: 'center', 
        width: '100%' 
    },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});