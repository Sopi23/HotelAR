// HOTELAR/app/(services)/spa.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PURPLE_PRIMARY = "#5C2D91";

const SPA_SERVICES = [
  { id: '1', name: "Swedish Massage", price: 85, duration: "60 min", icon: "spa" },
  { id: '2', name: "Deep Tissue Massage", price: 110, duration: "90 min", icon: "msh" },
  { id: '3', name: "Facial Treatment", price: 65, duration: "45 min", icon: "face-woman" },
  { id: '4', name: "Hot Stone Therapy", price: 130, duration: "75 min", icon: "hot-tub" },
];

const SpaBookingScreen = () => {
  const [selectedService, setSelectedService] = useState(SPA_SERVICES[0]);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        title: `Spa: ${selectedService.name}`,
        price: selectedService.price,
        type: "service",
        date: serverTimestamp(),
        timeSlot: selectedTime
      });

      Alert.alert("Booking Confirmed", `Your ${selectedService.name} is scheduled for ${selectedTime}.`, [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert("Error", "Could not complete booking.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Spa Session</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Select Service</Text>
        {SPA_SERVICES.map(service => (
          <TouchableOpacity 
            key={service.id} 
            style={[styles.serviceCard, selectedService.id === service.id && styles.selectedCard]}
            onPress={() => setSelectedService(service)}
          >
            <MaterialCommunityIcons name={service.icon as any} size={24} color={PURPLE_PRIMARY} />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceInfo}>{service.duration}</Text>
            </View>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionLabel}>Available Times Today</Text>
        <View style={styles.timeGrid}>
          {["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"].map(time => (
            <TouchableOpacity 
              key={time} 
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[styles.timeText, selectedTime === time && { color: 'white' }]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
          <Text style={styles.bookBtnText}>Confirm Booking • ${selectedService.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', marginVertical: 15, color: '#333' },
  serviceCard: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  selectedCard: { borderColor: PURPLE_PRIMARY, backgroundColor: '#F3EFFF' },
  serviceName: { fontWeight: 'bold', fontSize: 16 },
  serviceInfo: { color: '#666', fontSize: 12 },
  servicePrice: { fontWeight: 'bold', color: PURPLE_PRIMARY, fontSize: 16 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '31%', padding: 12, backgroundColor: 'white', borderRadius: 8, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  selectedTimeSlot: { backgroundColor: PURPLE_PRIMARY, borderColor: PURPLE_PRIMARY },
  timeText: { fontSize: 12, fontWeight: '600' },
  footer: { padding: 20, backgroundColor: 'white' },
  bookBtn: { backgroundColor: PURPLE_PRIMARY, padding: 18, borderRadius: 15, alignItems: 'center' },
  bookBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default SpaBookingScreen;