// HOTELAR/app/help-center.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';

const PURPLE_PRIMARY = '#5C2D91';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Dummy FAQ Data ---
const FAQ_DATA = [
    { question: "How do I check in online?", answer: "You can check in online 24 hours prior to your scheduled arrival via our mobile app or website using your booking confirmation number. This speeds up your on-site check-in process." },
    { question: "Can I modify or cancel my booking?", answer: "Booking modification and cancellation depends on the rate plan you selected. Please visit the 'My Bookings' tab and select 'Modify' or contact our call center." },
    { question: "How do I request room service?", answer: "Room service can be ordered directly from the Home screen under Quick Action, or by calling the front desk using your in-room phone." },
    { question: "What payment methods are accepted?", answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and cash payments at the front desk. See 'Payment Methods' in Settings for details." },
    { question: "How do I view my bill?", answer: "Your current bill is available in real-time under the 'Bill' tab on the bottom navigation bar." },
    { question: "Is there a late checkout option?", answer: "Late checkout is subject to availability and may incur an extra charge. Please contact the front desk on the morning of your check-out." },
    { question: "How do I report an issue with my room?", answer: "You can report any issues (e.g., broken AC, plumbing) via the 'Report Issues' Quick Action button on the Home screen." },
    { question: "Can I extend my stay?", answer: "Yes, you can check availability and request an extension directly from the 'Current Stay' card on the Home screen or by calling the reception." },
];
// --- END Dummy FAQ Data ---

const HelpCenterScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleContactSupport = () => {
        Alert.alert("Support Contact", "Opening chat window or dialing support number.");
    };

    const FAQItem = ({ item, index }: { item: typeof FAQ_DATA[0], index: number }) => (
        <View style={styles.faqCard}>
            <TouchableOpacity style={styles.faqHeader} onPress={() => toggleAccordion(index)}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <MaterialIcons 
                    name={expandedId === index ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#666" 
                />
            </TouchableOpacity>
            {expandedId === index && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
            )}
        </View>
    );

    const filteredFAQ = FAQ_DATA.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBackground}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <Text style={styles.headerSubtitle}>Find answers to common questions</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for help..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                {/* Quick Contact Buttons */}
                <View style={styles.contactButtonsContainer}>
                    <TouchableOpacity style={styles.contactButton} onPress={() => Alert.alert('Call', 'Dialing support...')}>
                        <MaterialIcons name="call" size={24} color={PURPLE_PRIMARY} />
                        <Text style={styles.contactButtonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={() => Alert.alert('Email', 'Opening email client...')}>
                        <MaterialIcons name="email" size={24} color={PURPLE_PRIMARY} />
                        <Text style={styles.contactButtonText}>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={() => Alert.alert('Chat', 'Opening chat support...')}>
                        <MaterialIcons name="chat" size={24} color={PURPLE_PRIMARY} />
                        <Text style={styles.contactButtonText}>Chat</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQ List */}
                {filteredFAQ.map((item, index) => (
                    <FAQItem key={index} item={item} index={index} />
                ))}
                
                {/* Still Need Help */}
                <View style={styles.supportFooter}>
                    <Text style={styles.supportTitle}>Still need help?</Text>
                    <Text style={styles.supportText}>Our support team is available 24/7 to assist you</Text>
                    <TouchableOpacity style={styles.supportButton} onPress={handleContactSupport}>
                        <Text style={styles.supportButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 50 }} /> {/* Spacer for tab bar */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: PURPLE_PRIMARY },
    scrollContent: { paddingBottom: 20, backgroundColor: '#F7F7F7' },
    headerBackground: { backgroundColor: PURPLE_PRIMARY, paddingHorizontal: 25, paddingVertical: 20, position: 'relative' },
    backButton: { position: 'absolute', left: 15, top: 30 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 10 },
    headerSubtitle: { fontSize: 16, color: '#D4B8FF', marginBottom: 10 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 10, marginTop: -30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: '#333' },
    contactButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
    contactButton: { flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 5, elevation: 2 },
    contactButtonText: { fontSize: 14, color: PURPLE_PRIMARY, marginTop: 5, fontWeight: 'bold' },
    faqCard: { backgroundColor: 'white', marginHorizontal: 20, marginTop: 10, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
    faqQuestion: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500', marginRight: 10 },
    faqAnswerContainer: { paddingHorizontal: 15, paddingBottom: 15, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    faqAnswer: { fontSize: 14, color: '#666', lineHeight: 22 },
    supportFooter: { backgroundColor: 'white', marginHorizontal: 20, marginTop: 20, padding: 25, borderRadius: 15, alignItems: 'center', elevation: 5 },
    supportTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    supportText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
    supportButton: { backgroundColor: PURPLE_PRIMARY, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, width: '100%' },
    supportButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});