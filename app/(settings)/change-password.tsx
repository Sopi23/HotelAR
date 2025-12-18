import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { router } from 'expo-router';

export default function ChangePassword() {
  const handleReset = async () => {
    if (auth.currentUser?.email) {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      Alert.alert("Email Sent", "Check your inbox to reset your password.");
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security</Text>
      <Text style={styles.desc}>We will send a reset link to: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleReset}>
        <Text style={styles.btnText}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  desc: { textAlign: 'center', marginVertical: 20, color: '#666' },
  btn: { backgroundColor: '#5C2D91', padding: 15, borderRadius: 10, width: '100%' },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});