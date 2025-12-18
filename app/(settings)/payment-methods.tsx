import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PaymentMethods() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Cards</Text>
      <View style={styles.card}>
        <MaterialIcons name="credit-card" size={24} color="#5C2D91" />
        <Text style={styles.cardText}>**** **** **** 4242</Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add New Method</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', elevation: 2 },
  cardText: { marginLeft: 15, fontSize: 16, color: '#333' },
  addBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  addBtnText: { color: '#5C2D91', fontWeight: 'bold' }
});