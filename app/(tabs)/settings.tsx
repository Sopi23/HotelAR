// HOTELAR/app/(tabs)/settings.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
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

const PURPLE_PRIMARY = '#5C2D91';
const RED_DANGER = '#B32824';

const SettingsScreen = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setter(prev => !prev);
  };

  const handleNavigation = (path: string) => {
    // Navigate to a specific screen
    router.push(path);
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
          onPress: () => {
            // Simulate sign out process
            Alert.alert("Signed Out", "You have been successfully signed out.");
            // Navigate back to the sign-in form (replace ensures history is cleared)
            router.replace('/signin-form'); 
          }
        },
      ]
    );
  };
  
  // Reusable Component for navigation items
  const SettingItem = ({ icon, title, isToggle = false, value, onPress, path }: 
    { icon: any, title: string, isToggle?: boolean, value?: boolean, onPress?: () => void, path?: string }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={isToggle ? onPress : () => handleNavigation(path!)}
      activeOpacity={isToggle ? 0.7 : 0.5}
      disabled={isToggle && !onPress}
    >
      <MaterialIcons name={icon} size={24} color={PURPLE_PRIMARY} style={styles.itemIcon} />
      <Text style={styles.itemTitle}>{title}</Text>
      
      {isToggle ? (
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#81A8D4" }}
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
        
        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingsBlock}>
          <SettingItem 
            icon="notifications-active" 
            title="Push Notifications" 
            isToggle 
            value={pushEnabled} 
            onPress={toggleSwitch(setPushEnabled)} 
          />
          <SettingItem 
            icon="email" 
            title="Email Notifications" 
            isToggle 
            value={emailEnabled} 
            onPress={toggleSwitch(setEmailEnabled)} 
          />
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsBlock}>
          <SettingItem 
            icon="dark-mode" 
            title="Dark Mode" 
            isToggle 
            value={darkModeEnabled} 
            onPress={toggleSwitch(setDarkModeEnabled)} 
          />
          <SettingItem 
            icon="language" 
            title="Language" 
            path="/language-settings" // Placeholder path for future screens
          />
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingsBlock}>
          <SettingItem 
            icon="lock" 
            title="Change Password" 
            path="/change-password"
          />
          <SettingItem 
            icon="payment" 
            title="Payment Methods" 
            path="/payment-methods" // Sub-screen image available
          />
          <SettingItem 
            icon="security" 
            title="Privacy & Security" 
            path="/privacy-security" // Sub-screen image available
          />
        </View>

        {/* Support Section */}
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.settingsBlock}>
          <SettingItem 
            icon="help-center" 
            title="Help Center" 
            path="/help-center" // Sub-screen image available
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 50 }} /> {/* Spacer for tab bar */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_PRIMARY,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F7F7F7',
  },
  headerBackground: {
    backgroundColor: PURPLE_PRIMARY,
    paddingHorizontal: 25,
    paddingVertical: 30,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D4B8FF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 5,
  },
  settingsBlock: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden', // Ensures borders work nicely
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED_DANGER,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    elevation: 4,
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});