// HOTELAR/app/(tabs)/index.tsx

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
// 1. IMPORT AUTH TO GET REAL USER DATA
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// --- Dummy Data (Keep these for UI testing) ---
const CURRENT_ROOM_NAME = "Deluxe Suite 405";
const CURRENT_ROOM_NUMBER = "405";
const CURRENT_LOCATION = "4th Floor, Tower A";
const CHECK_OUT_DATE = "Jan 25, 2025";

const HomeScreen = () => {
  const [userName, setUserName] = useState("Guest");

  // 2. FETCH REAL USER NAME
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Use email prefix if username isn't set in profile yet
        setUserName(user.displayName || user.email?.split('@')[0] || "Guest");
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. UPDATED QUICK ACTION LOGIC
  const handleQuickAction = (name: string) => {
    switch (name) {
      case "Room Service":
        // This will navigate to app/services/food.tsx
        router.push("/(services)/food" as any);
        break;
      case "Amenities":
        router.push("/(services)/request-items" as any);
        break;
      case "Book Room":
        router.push("/(services)/new-booking" as any); // Or a specific booking page
        Alert.alert("Booking", "Navigating to New Booking page...");
        break;
      case "Concierge":
        router.push("/(support)/help" as any);
        break;
      case "Spa & Wellness":
        router.push("/(services)/spa" as any);
        break;
      case "Report Issues":
        router.push("/(support)/report" as any);
        break;
      default:
        Alert.alert("Coming Soon", "This feature is currently under development.");
    }
  };

  const QuickActionButton = ({ icon, label, color, name }: { icon: any, label: string, color: string, name: string }) => (
    <TouchableOpacity 
      style={[styles.quickActionButton, { backgroundColor: color }]} 
      onPress={() => handleQuickAction(name)}
    >
      <MaterialIcons name={icon} size={28} color="white" />
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const RecentActivityCard = ({ icon, text, time, price, color }: { icon: any, text: string, time: string, price?: string, color: string }) => (
    <View style={styles.activityCard}>
      <View style={[styles.activityIconWrapper, { borderColor: color }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.activityDetails}>
        <Text style={styles.activityText}>{text}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      {price && <Text style={styles.activityPrice}>{price}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerBackground}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPriority}>Your comfort is our priority</Text>
        </View>

        <View style={styles.currentStayCard}>
          <Text style={styles.currentStayTitle}>Current Stay</Text>
          <Text style={styles.currentStayRoomType}>{CURRENT_ROOM_NAME}</Text>
          
          <View style={styles.roomNumberContainer}>
              <Text style={styles.roomNumberText}>Room</Text>
              <Text style={styles.roomNumber}>{CURRENT_ROOM_NUMBER}</Text>
          </View>
          
          <View style={styles.stayDetailRow}>
              <MaterialIcons name="location-pin" size={18} color="#666" />
              <Text style={styles.stayDetailText}>{CURRENT_LOCATION}</Text>
          </View>
          <View style={styles.stayDetailRow}>
              <MaterialIcons name="calendar-today" size={16} color="#666" />
              <Text style={styles.stayDetailText}>Check-out: {CHECK_OUT_DATE}</Text>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => Alert.alert("Request", "Extend stay request sent.")}>
                <Text style={styles.actionText}>Extend Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/bill' as any)}>
                <Text style={styles.actionText}>View Bill</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Quick Action</Text>
            <View style={styles.quickActionsGrid}>
                <QuickActionButton icon="room-service" label="Order Food" color="#6B59CC" name="Room Service" />
                <QuickActionButton icon="local-laundry-service" label="Request Items" color="#388E8E" name="Amenities" />
                <QuickActionButton icon="book-online" label="New Booking" color="#81A8D4" name="Book Room" />
                <QuickActionButton icon="support-agent" label="Get help" color="#A76BC1" name="Concierge" />
                <QuickActionButton icon="spa" label="Book Spa" color="#D4C16B" name="Spa & Wellness" />
                <QuickActionButton icon="report-problem" label="Report Issues" color="#C17C6B" name="Report Issues" />
            </View>

            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <RecentActivityCard icon="room-service" text="Room Service Delivered" time="10 mins ago" price="$45.00" color="#6B59CC" />
            <RecentActivityCard icon="shower" text="Towel Request completed" time="1 hour ago" color="#C17C6B" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

// --- STYLES (Kept as you provided with minor padding adjustments) ---
const PURPLE_DARK = '#5C2D91';
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },
  headerBackground: { backgroundColor: PURPLE_DARK, padding: 25, paddingBottom: 80 },
  welcomeText: { fontSize: 18, color: '#D4B8FF', marginTop: 10 },
  userName: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  userPriority: { fontSize: 16, color: 'white' },
  currentStayCard: { backgroundColor: 'white', borderRadius: 15, marginHorizontal: 20, marginTop: -60, padding: 20, elevation: 8 },
  currentStayTitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  currentStayRoomType: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  roomNumberContainer: { position: 'absolute', top: 20, right: 20, backgroundColor: '#F0F0F0', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 12, alignItems: 'center' },
  roomNumberText: { fontSize: 10, color: '#666' },
  roomNumber: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  stayDetailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stayDetailText: { fontSize: 14, color: '#444', marginLeft: 10 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10 },
  actionText: { fontSize: 16, fontWeight: 'bold', color: PURPLE_DARK },
  contentContainer: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 15 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickActionButton: { width: '31%', aspectRatio: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: 5, elevation: 3 },
  quickActionLabel: { fontSize: 11, fontWeight: '600', color: 'white', marginTop: 5, textAlign: 'center' },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 1 },
  activityIconWrapper: { borderWidth: 2, borderRadius: 8, padding: 5, marginRight: 15 },
  activityDetails: { flex: 1 },
  activityText: { fontSize: 15, fontWeight: '600', color: '#333' },
  activityTime: { fontSize: 12, color: '#999' },
  activityPrice: { fontSize: 15, fontWeight: 'bold', color: '#333' },
});