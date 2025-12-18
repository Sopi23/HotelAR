// HOTELAR/app/(services)/request-items.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PURPLE_PRIMARY = "#5C2D91";

// --- Amenity Data ---
const AMENITIES = [
  { id: "1", name: "Extra Towels", icon: "curtains", desc: "Fresh bath towels" },
  { id: "2", name: "Bottled Water", icon: "local-drink", desc: "500ml mineral water" },
  { id: "3", name: "Dental Kit", icon: "clean-hands", desc: "Toothbrush & paste" },
  { id: "4", name: "Pillows", icon: " king-bed", desc: "Soft feather pillows" },
  { id: "5", name: "Toiletries", icon: "sanitizer", desc: "Shampoo & Soap set" },
  { id: "6", name: "Laundry Bag", icon: "shopping-bag", desc: "For dry cleaning" },
];

const RequestItemsScreen = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const adjustQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const submitRequest = () => {
    const requestedList = AMENITIES.filter(item => quantities[item.id] > 0)
      .map(item => `${quantities[item.id]}x ${item.name}`)
      .join(", ");

    Alert.alert(
      "Confirm Request",
      `Send request for: ${requestedList}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Send", 
          onPress: () => {
            Alert.alert("Request Sent", "Housekeeping has been notified.");
            router.back();
          } 
        },
      ]
    );
  };

  const renderAmenity = ({ item }: { item: typeof AMENITIES[0] }) => {
    const qty = quantities[item.id] || 0;
    
    return (
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <MaterialIcons name={item.icon as any} size={30} color={PURPLE_PRIMARY} />
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>

        <View style={styles.counter}>
          <TouchableOpacity onPress={() => adjustQty(item.id, -1)}>
            <MaterialIcons name="remove-circle-outline" size={26} color={qty > 0 ? "#666" : "#CCC"} />
          </TouchableOpacity>
          
          <Text style={styles.qtyText}>{qty}</Text>
          
          <TouchableOpacity onPress={() => adjustQty(item.id, 1)}>
            <MaterialIcons name="add-circle" size={26} color={PURPLE_PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Amenities</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={AMENITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderAmenity}
        contentContainerStyle={styles.list}
      />

      {totalItems > 0 && (
        <TouchableOpacity style={styles.submitBtn} onPress={submitRequest}>
          <Text style={styles.submitBtnText}>Request {totalItems} Items</Text>
        </TouchableOpacity>
      )}
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
  list: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F0EBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  desc: { fontSize: 12, color: "#888", marginTop: 2 },
  counter: { flexDirection: "row", alignItems: "center" },
  qtyText: { marginHorizontal: 12, fontSize: 16, fontWeight: "bold", minWidth: 20, textAlign: 'center' },
  submitBtn: {
    backgroundColor: PURPLE_PRIMARY,
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default RequestItemsScreen;