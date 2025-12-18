// HOTELAR/app/privacy-security.tsx

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

const PrivacySecurityScreen = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [marketingComms, setMarketingComms] = useState(false);

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setter(prev => !prev);
  };

  const handleAction = (action: string) => {
    Alert.alert(action, `Action to ${action.toLowerCase()} initiated.`);
  };
  
  const handleViewSessionHistory = () => {
      Alert.alert("Session History", "Displaying recent login activity.");
  };

  const handleGoBack = () => {
    router.back();
  };
  
  // Reusable Component for navigation items
  const SettingItem = ({ icon, title, isToggle = false, value, onPress, description, actionButton, actionPath }: 
    { icon: any, title: string, isToggle?: boolean, value?: boolean, onPress?: () => void, description?: string, actionButton?: string, actionPath?: () => void }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
          <MaterialIcons name={icon} size={24} color={PURPLE_PRIMARY} style={styles.itemIcon} />
          <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <Text style={styles.itemDescription}>{description}</Text>
      
      {isToggle ? (
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#81A8D4" }}
          thumbColor={value ? PURPLE_PRIMARY : "#F4F3F4"}
          onValueChange={onPress}
          value={value}
          style={styles.switchControl}
        />
      ) : actionButton ? (
        <TouchableOpacity style={styles.actionSmallButton} onPress={actionPath}>
            <Text style={styles.actionSmallButtonText}>{actionButton}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBackground}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <Text style={styles.headerSubtitle}>Control your data and security</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Privacy Controls */}
        <Text style={styles.sectionTitle}><Ionicons name="settings-outline" size={16} color="#333" /> Privacy Controls</Text>
        <View style={styles.settingsBlock}>
            <SettingItem 
                icon="visibility" 
                title="Profile Visibility" 
                description="Allow hotel staff to view your profile"
                isToggle 
                value={profileVisibility} 
                onPress={toggleSwitch(setProfileVisibility)} 
            />
            <SettingItem 
                icon="track-changes" 
                title="Activity Tracking" 
                description="Help us improve your experience"
                isToggle 
                value={activityTracking} 
                onPress={toggleSwitch(setActivityTracking)} 
            />
            <SettingItem 
                icon="mail" 
                title="Marketing Communications" 
                description="Receive special offers and promotions"
                isToggle 
                value={marketingComms} 
                onPress={toggleSwitch(setMarketingComms)} 
            />
        </View>
        
        {/* Security Settings */}
        <Text style={styles.sectionTitle}><MaterialIcons name="lock-outline" size={16} color="#333" /> Security Settings</Text>
        <View style={styles.settingsBlock}>
            <SettingItem 
                icon="vpn-key" 
                title="Two-Factor Authentication" 
                description="Add an extra layer of security"
                actionButton="Enable"
                actionPath={() => handleAction('Enable 2FA')}
            />
            <SettingItem 
                icon="fingerprint" 
                title="Biometric Login" 
                description="Use fingerprint or face recognition"
                actionButton="Enable"
                actionPath={() => handleAction('Enable Biometrics')}
            />
            <SettingItem 
                icon="history" 
                title="Session History" 
                description="View your recent login activity"
                actionButton="View"
                actionPath={handleViewSessionHistory}
            />
        </View>

        {/* Data Management */}
        <Text style={styles.sectionTitle}><MaterialIcons name="cloud-download" size={16} color="#333" /> Data Management</Text>
        <View style={styles.dataBlock}>
            <Text style={styles.dataTitle}>Download Your Data</Text>
            <Text style={styles.dataDescription}>Get a copy of all your data including bookings, preferences, and activity</Text>
            <TouchableOpacity style={styles.dataButton} onPress={() => handleAction('Request Data Export')}>
                <MaterialIcons name="cloud-download" size={24} color={PURPLE_PRIMARY} />
                <Text style={styles.dataButtonText}>Request Data Export</Text>
            </TouchableOpacity>
            
            <Text style={[styles.dataTitle, { marginTop: 20 }]}>Delete Account</Text>
            <Text style={styles.dataDescription}>Permanently delete your account and all associated data</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleAction('Permanently Delete Account')}>
                <MaterialIcons name="delete-forever" size={24} color="white" />
                <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>

        {/* Policy Links */}
        <View style={styles.policyBlock}>
            <TouchableOpacity style={styles.policyItem} onPress={() => Alert.alert('Policy', 'Opening Privacy Policy...')}>
                <Text style={styles.policyText}>Privacy Policy</Text>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.policyItem} onPress={() => Alert.alert('Policy', 'Opening Terms of Service...')}>
                <Text style={styles.policyText}>Terms of Service</Text>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.policyItem} onPress={() => Alert.alert('Policy', 'Opening Cookie Policy...')}>
                <Text style={styles.policyText}>Cookie Policy</Text>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} /> {/* Spacer for tab bar */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PURPLE_PRIMARY },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#F7F7F7' },
  headerBackground: { backgroundColor: PURPLE_PRIMARY, paddingHorizontal: 25, paddingVertical: 20, position: 'relative' },
  backButton: { position: 'absolute', left: 15, top: 30 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 10 },
  headerSubtitle: { fontSize: 16, color: '#D4B8FF', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  settingsBlock: { backgroundColor: 'white', borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  itemContainer: { paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', position: 'relative' },
  itemHeader: { flexDirection: 'row', alignItems: 'center' },
  itemIcon: { marginRight: 15 },
  itemTitle: { flex: 1, fontSize: 16, color: '#333', fontWeight: '600' },
  itemDescription: { fontSize: 14, color: '#666', marginTop: 5, marginLeft: 39 },
  switchControl: { position: 'absolute', right: 15, top: 15 },
  actionSmallButton: { position: 'absolute', right: 15, top: 20, backgroundColor: '#EBE0FF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  actionSmallButtonText: { color: PURPLE_PRIMARY, fontWeight: 'bold', fontSize: 14 },
  dataBlock: { backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  dataTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  dataDescription: { fontSize: 14, color: '#666', marginBottom: 15 },
  dataButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBE0FF', paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: PURPLE_PRIMARY, marginTop: 10 },
  dataButtonText: { color: PURPLE_PRIMARY, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  deleteButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: RED_DANGER, paddingVertical: 12, borderRadius: 10, marginTop: 10 },
  deleteButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  policyBlock: { backgroundColor: 'white', borderRadius: 10, marginTop: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  policyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  policyText: { fontSize: 16, color: '#333' },
});