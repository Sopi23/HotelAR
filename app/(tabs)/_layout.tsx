import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const PURPLE_PRIMARY = "#5C2D91";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PURPLE_PRIMARY,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
      }}
    >
      {/* 1. Home / Explore */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />

      {/* 2. My Bookings */}
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={26} color={color} />
          ),
        }}
      />

      {/* 3. Bill / Payments */}
      <Tabs.Screen
        name="bill"
        options={{
          title: "Bill",
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={26} color={color} />
          ),
        }}
      />

      {/* 4. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={26} color={color} />
          ),
        }}
      />

      {/* 5. Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
