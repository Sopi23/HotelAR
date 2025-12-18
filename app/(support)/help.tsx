// HOTELAR/app/(support)/help.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PURPLE_PRIMARY = "#5C2D91";

const HelpScreen = () => {
  
 const handleCall = async () => {
  const phoneNumber = 'tel:0'; // '0' is usually the front desk
  try {
    const supported = await Linking.canOpenURL(phoneNumber);
    if (supported) {
      await Linking.openURL(phoneNumber);
    } else {
      Alert.alert("Error", "Phone calls are not supported on this device.");
    }
  } catch {
    Alert.alert("Error", "An error occurred while trying to call.");
  }
};
  const handleChat = () => {
    Alert.alert("Chat", "Opening live chat with support...");
  };

  const FAQItem = ({ question }: { question: string }) => (
    <TouchableOpacity style={styles.faqItem}>
      <Text style={styles.faqText}>{question}</Text>
      <MaterialIcons name="chevron-right" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Concierge & Help</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>How can we help today?</Text>
        
        {/* Contact Options */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactCard} onPress={handleChat}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8E1FF' }]}>
              <MaterialIcons name="chat" size={28} color={PURPLE_PRIMARY} />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
            <View style={[styles.iconCircle, { backgroundColor: '#E1F5FE' }]}>
              <MaterialIcons name="phone" size={28} color="#0288D1" />
            </View>
            <Text style={styles.contactLabel}>Call Desk</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          <FAQItem question="What is the Wi-Fi password?" />
          <FAQItem question="What time is check-out?" />
          <FAQItem question="Where is the fitness center located?" />
          <FAQItem question="How do I use the coffee machine?" />
          <FAQItem question="Can I request a late check-out?" />
        </View>

        {/* Emergency Card */}
        <TouchableOpacity 
            style={styles.emergencyCard}
            onPress={() => Alert.alert("Emergency", "Connecting to Hotel Security...")}
        >
          <MaterialIcons name="report" size={24} color="white" />
          <Text style={styles.emergencyText}>Emergency Assistance</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    elevation: 2,
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 20, marginTop: 10 },
  contactContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  contactCard: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  contactLabel: { fontSize: 16, fontWeight: "600", color: "#333" },
  faqList: { backgroundColor: "white", borderRadius: 15, overflow: "hidden", elevation: 1 },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  faqText: { fontSize: 15, color: "#444" },
  emergencyCard: {
    backgroundColor: "#D32F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  emergencyText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
});

export default HelpScreen;