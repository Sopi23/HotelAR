// HOTELAR/app/(tabs)/_layout.tsx (Tabs Layout Definition - The FINAL, CLEANED VERSION)

import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// Define constants once
const PURPLE_PRIMARY = '#5C2D91';
const ICON_SIZE = 28;

// Define the component with ONE default export
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PURPLE_PRIMARY,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#EEE',
        },
        headerShown: false, // Hide the header for all tab screens
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings', // Changed title to plural to match image
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-today" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="bill"
        options={{
          title: 'Bill',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="receipt" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      {/* Note: The 'explore' tab was removed as it wasn't shown in your final tab bar design.
        If you want it back, uncomment the following:
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="travel-explore" color={color} size={ICON_SIZE} />
          ),
        }}
      /> 
      */}
    </Tabs>
  );
}