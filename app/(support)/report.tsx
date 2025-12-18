// HOTELAR/app/(support)/report.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PURPLE_PRIMARY = "#5C2D91";
const RED_ERROR = "#C17C6B";

const ISSUE_TYPES = [
  { id: "1", label: "Broken Light", icon: "lightbulb" },
  { id: "2", label: "AC / Heat", icon: "ac-unit" },
  { id: "3", label: "Plumbing", icon: "water-damage" },
  { id: "4", label: "TV / WiFi", icon: "wifi" },
  { id: "5", label: "Door Lock", icon: "lock" },
  { id: "6", label: "Other", icon: "more-horiz" },
];

const ReportIssueScreen = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!selectedIssue && !description) {
      Alert.alert("Error", "Please select an issue type or provide a description.");
      return;
    }

    const issueLabel = ISSUE_TYPES.find(i => i.id === selectedIssue)?.label || "General Issue";
    
    Alert.alert(
      "Report Issue",
      `Report "${issueLabel}" to maintenance?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Report", 
          onPress: () => {
            Alert.alert("Issue Reported", "Maintenance has been notified and will arrive shortly.");
            router.back();
          } 
        },
      ]
    );
  };

  const IssueButton = ({ id, label, icon }: { id: string, label: string, icon: any }) => {
    const isSelected = selectedIssue === id;
    return (
      <TouchableOpacity
        style={[styles.issueBtn, isSelected && styles.issueBtnSelected]}
        onPress={() => setSelectedIssue(id)}
      >
        <MaterialIcons 
          name={icon} 
          size={28} 
          color={isSelected ? PURPLE_PRIMARY : "#666"} 
        />
        <Text style={[styles.issueLabel, isSelected && styles.issueLabelSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>What is the problem?</Text>
        <View style={styles.grid}>
          {ISSUE_TYPES.map(issue => (
            <IssueButton key={issue.id} {...issue} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>More Details (Optional)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E.g., The bathroom light is flickering..."
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 30 },
  issueBtn: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
  },
  issueBtnSelected: {
    borderColor: PURPLE_PRIMARY,
    backgroundColor: "#F3EFFF",
  },
  issueLabel: { marginTop: 8, fontSize: 12, color: "#666", textAlign: "center" },
  issueLabelSelected: { color: PURPLE_PRIMARY, fontWeight: "bold" },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 5,
    elevation: 2,
  },
  input: {
    height: 120,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  footer: { padding: 20, backgroundColor: "white", elevation: 10 },
  submitBtn: {
    backgroundColor: RED_ERROR,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  submitBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ReportIssueScreen;