// HOTELAR/app/(services)/new-booking.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PURPLE_PRIMARY = "#5C2D91";

const ROOMS = [
  { id: '1', type: "Executive Suite", price: 250, image: "https://picsum.photos/id/274/400/300" },
  { id: '2', type: "Presidential Suite", price: 500, image: "https://picsum.photos/id/201/400/300" },
];

const NewBookingScreen = () => {
  const handleReserve = (room: any) => {
    Alert.alert("New Booking", `Would you like to reserve the ${room.type} for $${room.price}/night?`, [
      { text: "Cancel" },
      { text: "Reserve", onPress: () => Alert.alert("Success", "Our team will contact you for deposit payment.") }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Extend or New Stay</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={ROOMS}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.roomCard}>
            <Image source={{ uri: item.image }} style={styles.roomImage} />
            <View style={styles.roomDetails}>
              <Text style={styles.roomType}>{item.type}</Text>
              <Text style={styles.roomPrice}>${item.price} / night</Text>
              <TouchableOpacity style={styles.reserveBtn} onPress={() => handleReserve(item)}>
                <Text style={styles.reserveText}>Reserve Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  roomCard: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', marginBottom: 20, elevation: 3 },
  roomImage: { width: '100%', height: 200 },
  roomDetails: { padding: 20 },
  roomType: { fontSize: 20, fontWeight: 'bold' },
  roomPrice: { fontSize: 16, color: PURPLE_PRIMARY, marginVertical: 5, fontWeight: '600' },
  reserveBtn: { backgroundColor: PURPLE_PRIMARY, marginTop: 15, padding: 12, borderRadius: 10, alignItems: 'center' },
  reserveText: { color: 'white', fontWeight: 'bold' },
});

export default NewBookingScreen;