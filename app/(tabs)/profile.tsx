// HOTELAR/app/(tabs)/profile.tsx

import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; // Required for actual image upload

const PURPLE_PRIMARY = '#5C2D91';
const LIGHT_TEAL = '#40D2B8';

// --- Dummy Data (Simulating dynamic customer data) ---
const CUSTOMER_DATA = {
    name: "Johni",
    memberStatus: "Gold Member",
    profileImageUri: "https://picsum.photos/id/1011/200/200", // Placeholder Image
    contact: {
        email: "joni@gmail.com",
        phone: "+94 520741039",
        address: "Main street No-1, Colombo",
    },
    memberSince: "November, 2025",
    preferences: [
        { key: "Room Temperature", value: "68 F" },
        { key: "Pillow Type", value: "Firm" },
    ],
    loyalty: {
        totalStays: 24,
        points: 1850,
        rewards: 250, // in dollars
    }
};
// --- END Dummy Data ---

const ProfileScreen = () => {

    const handleEdit = (field: string) => {
        Alert.alert("Edit Feature", `Open modal to edit ${field}.`);
        // In a real app, this would open a modal or navigate to an edit screen.
    };

    const handleImageUpload = () => {
        Alert.alert("Image Upload", "Simulating opening camera roll to change profile image.");
        // In a real app:
        // const result = await ImagePicker.launchImageLibraryAsync({...});
        // if (!result.canceled) { /* update state */ }
    };

    // Component for Contact and Member Info
    const ContactInfoRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
        <View style={styles.infoRowContainer}>
            <View style={styles.infoRow}>
                <MaterialIcons name={icon} size={24} color={PURPLE_PRIMARY} />
                <View style={styles.infoTextWrapper}>
                    <Text style={styles.infoLabel}>{label}</Text>
                    <Text style={styles.infoValue}>{value}</Text>
                </View>
            </View>
        </View>
    );

    // Component for Loyalty Stats
    const StatBox = ({ value, label }: { value: string | number, label: string }) => (
        <View style={styles.statBox}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Top Purple Background Area */}
                <View style={styles.topBackground} />

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    
                    <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer}>
                        <Image source={{ uri: CUSTOMER_DATA.profileImageUri }} style={styles.profileImage} />
                        {/* Optional: Add an icon overlay for editing */}
                        <MaterialIcons name="camera-alt" size={24} color="white" style={styles.editIconOverlay} />
                    </TouchableOpacity>

                    <View style={styles.profileDetails}>
                        <Text style={styles.userName}>{CUSTOMER_DATA.name}</Text>
                        <View style={styles.memberTag}>
                            <MaterialIcons name="military-tech" size={16} color="black" />
                            <Text style={styles.memberText}>{CUSTOMER_DATA.memberStatus}</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.editProfileButton} 
                        onPress={() => handleEdit('Profile')}
                    >
                        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Contact Information */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.contactCard}>
                        <ContactInfoRow 
                            icon="email" 
                            label="Email" 
                            value={CUSTOMER_DATA.contact.email} 
                        />
                        <ContactInfoRow 
                            icon="phone" 
                            label="Phone" 
                            value={CUSTOMER_DATA.contact.phone} 
                        />
                        <ContactInfoRow 
                            icon="location-on" 
                            label="Address" 
                            value={CUSTOMER_DATA.contact.address} 
                        />
                        <ContactInfoRow 
                            icon="date-range" 
                            label="Member Since" 
                            value={CUSTOMER_DATA.memberSince} 
                        />
                    </View>
                </View>

                {/* Preferences */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.preferencesContainer}>
                        {CUSTOMER_DATA.preferences.map((pref, index) => (
                            <View key={index} style={styles.preferenceRow}>
                                <Text style={styles.preferenceKey}>{pref.key}</Text>
                                <Text style={styles.preferenceValue}>{pref.value}</Text>
                                <TouchableOpacity 
                                    onPress={() => handleEdit(pref.key)}
                                    style={styles.preferenceEditButton}
                                >
                                    <Text style={styles.preferenceEditText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                
                {/* Loyalty Stats */}
                <View style={styles.statsContainer}>
                    <StatBox 
                        value={CUSTOMER_DATA.loyalty.totalStays} 
                        label="Total Stays" 
                    />
                    <StatBox 
                        value={CUSTOMER_DATA.loyalty.points.toLocaleString()} 
                        label="Points" 
                    />
                    <StatBox 
                        value={`$${CUSTOMER_DATA.loyalty.rewards.toFixed(0)}`} 
                        label="Rewards" 
                    />
                </View>

            <View style={{ height: 50 }} /> {/* Spacer for tab bar */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    topBackground: {
        backgroundColor: PURPLE_PRIMARY,
        height: 150,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileCard: {
        backgroundColor: '#F3EFFF', // Light background for the profile header area
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 50, // Positioned below the top background area
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    imageContainer: {
        marginRight: 15,
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'white',
    },
    editIconOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: PURPLE_PRIMARY,
        borderRadius: 15,
        padding: 4,
        borderWidth: 1,
        borderColor: 'white',
    },
    profileDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    memberTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    memberText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    },
    editProfileButton: {
        backgroundColor: LIGHT_TEAL,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        position: 'absolute', // Positioned absolutely within the card
        bottom: 10,
        right: 20,
    },
    editProfileButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    contactCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        overflow: 'hidden', // Ensures borders look clean
    },
    infoRowContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    infoTextWrapper: {
        marginLeft: 15,
    },
    infoLabel: {
        fontSize: 12,
        color: '#999',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    preferencesContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    preferenceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    preferenceKey: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    preferenceValue: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        marginRight: 10,
    },
    preferenceEditButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#EBE0FF', // Lighter shade of purple
    },
    preferenceEditText: {
        color: PURPLE_PRIMARY,
        fontSize: 14,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        marginTop: 25,
    },
    statBox: {
        backgroundColor: 'white',
        width: '30%',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PURPLE_PRIMARY,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});