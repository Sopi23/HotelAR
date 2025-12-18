// HOTELAR/app/(services)/payment.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const PURPLE_PRIMARY = "#5C2D91";

const PaymentScreen = () => {
  const { total } = useLocalSearchParams(); // Receive the total from the Bill screen
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleProcessPayment = () => {
  if (cardNumber.length < 16 || expiry.length < 4 || cvv.length < 3) {
    Alert.alert("Invalid Details", "Please fill in all card information correctly.");
    return;
  }

  // Simulate a loading state
  Alert.alert(
    "Processing...",
    "Please wait while we authorize your payment.",
    [{ text: "OK", onPress: () => completePayment() }]
  );
};

const completePayment = () => {
  // In a real app, you would update Firebase here to set balance to $0
  // or mark transactions as "Paid".
  
  Alert.alert(
    "Payment Successful!",
    "Your bill has been settled. Thank you for staying with us!",
    [
      { 
        text: "Finish", 
        onPress: () => router.replace("/(tabs)/home") 
      }
    ]
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Total to Pay</Text>
            <Text style={styles.amountValue}>${total}</Text>
          </View>

          <Text style={styles.sectionTitle}>Card Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="credit-card-outline" size={20} color="#666" />
              <TextInput 
                style={styles.input} 
                placeholder="1234 5678 1234 5678" 
                keyboardType="numeric"
                maxLength={16}
                value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Expiry (MM/YY)</Text>
              <TextInput 
                style={styles.inputSmall} 
                placeholder="12/26" 
                keyboardType="numeric"
                maxLength={5}
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput 
                style={styles.inputSmall} 
                placeholder="123" 
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handleProcessPayment}>
            <Text style={styles.payButtonText}>Confirm & Pay</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  amountCard: { backgroundColor: PURPLE_PRIMARY, padding: 25, borderRadius: 20, alignItems: 'center', marginBottom: 30 },
  amountLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
  amountValue: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE' },
  input: { flex: 1, height: 50, marginLeft: 10, fontSize: 16 },
  inputSmall: { backgroundColor: 'white', borderRadius: 12, height: 50, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE', fontSize: 16 },
  row: { flexDirection: 'row' },
  payButton: { backgroundColor: PURPLE_PRIMARY, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  payButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default PaymentScreen;