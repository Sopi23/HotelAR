// HOTELAR/app/(tabs)/settings.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 1. Install this: npx expo install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Double check your path

const PURPLE_PRIMARY = '#5C2D91';
const RED_DANGER = '#B32824';

interface SettingItemProps {
  icon: any;
  title: string;
  isToggle?: boolean;
  value?: boolean;
  path?: string;
  onPress?: (value: boolean) => void;
}

const SettingsScreen = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // 2. Load settings when the screen opens
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const push = await AsyncStorage.getItem('pushEnabled');
        const email = await AsyncStorage.getItem('emailEnabled');
        const dark = await AsyncStorage.getItem('darkModeEnabled');

        if (push !== null) setPushEnabled(JSON.parse(push));
        if (email !== null) setEmailEnabled(JSON.parse(email));
        if (dark !== null) setDarkModeEnabled(JSON.parse(dark));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    loadSettings();
  }, []);

  // 3. Save settings when toggled
  const handleToggle = (key: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => async (newValue: boolean) => {
    setter(newValue);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error("Failed to save setting", e);
    }
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      // Navigates to app/(settings)/[path].tsx
      router.push(`/(settings)/${path}` as any);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/(auth)/login');
            } catch {
              Alert.alert("Error", "Could not sign out.");
            }
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, isToggle = false, value, path, onPress }: SettingItemProps) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={isToggle ? undefined : () => handleNavigation(path)}
      activeOpacity={isToggle ? 1 : 0.6}
    >
      <MaterialIcons name={icon} size={24} color={PURPLE_PRIMARY} style={styles.itemIcon} />
      <Text style={styles.itemTitle}>{title}</Text>

      {isToggle ? (
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#D4B8FF" }}
          thumbColor={value ? PURPLE_PRIMARY : "#F4F3F4"}
          onValueChange={onPress}
          value={value}
        />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingsBlock}>
          <SettingItem
            icon="notifications-active"
            title="Push Notifications"
            isToggle
            value={pushEnabled}
            onPress={handleToggle('pushEnabled', setPushEnabled)}
          />
          <SettingItem
            icon="email"
            title="Email Notifications"
            isToggle
            value={emailEnabled}
            onPress={handleToggle('emailEnabled', setEmailEnabled)}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsBlock}>
          <SettingItem
            icon="dark-mode"
            title="Dark Mode"
            isToggle
            value={darkModeEnabled}
            onPress={handleToggle('darkModeEnabled', setDarkModeEnabled)}
          />
          <SettingItem icon="language" title="Language" path="language" />
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingsBlock}>
          <SettingItem icon="lock" title="Change Password" path="change-password" />
          <SettingItem icon="payment" title="Payment Methods" path="payment-methods" />
          <SettingItem icon="security" title="Privacy & Policy" path="privacy-policy" />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.settingsBlock}>
          <SettingItem icon="help-center" title="Help Center" path="help-center" />
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PURPLE_PRIMARY },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#F7F7F7' },
  headerBackground: { backgroundColor: PURPLE_PRIMARY, paddingHorizontal: 25, paddingVertical: 30, marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 16, color: '#D4B8FF' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10, paddingLeft: 5 },
  settingsBlock: { backgroundColor: 'white', borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, overflow: 'hidden' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  itemIcon: { marginRight: 15 },
  itemTitle: { flex: 1, fontSize: 16, color: '#333' },
  signOutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: RED_DANGER, paddingVertical: 15, borderRadius: 10, marginTop: 30, elevation: 4 },
  signOutText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});