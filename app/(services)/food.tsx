// HOTELAR/app/(services)/food.tsx

import React, { useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PURPLE_PRIMARY = "#5C2D91";

// --- Dummy Menu Data ---
const MENU_DATA = [
  { id: "1", name: "Classic Club Sandwich", price: 12.50, category: "Snacks", image: "https://picsum.photos/id/429/200" },
  { id: "2", name: "Truffle Mushroom Pasta", price: 18.00, category: "Main", image: "https://picsum.photos/id/425/200" },
  { id: "3", name: "Margherita Pizza", price: 15.00, category: "Main", image: "https://picsum.photos/id/292/200" },
  { id: "4", name: "Caesar Salad", price: 10.00, category: "Healthy", image: "https://picsum.photos/id/493/200" },
  { id: "5", name: "Chocolate Lava Cake", price: 8.50, category: "Dessert", image: "https://picsum.photos/id/102/200" },
];

const FoodServiceScreen = () => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.keys(cart).reduce((total, id) => {
      const item = MENU_DATA.find((m) => m.id === id);
      return total + (item?.price || 0) * cart[id];
    }, 0);
  };

  const handlePlaceOrder = async () => {
  const total = calculateTotal();
  const user = auth.currentUser;

  if (!user) {
    Alert.alert("Error", "You must be logged in to order.");
    return;
  }

  try {
    // Save to Firestore: users -> [uid] -> transactions
    await addDoc(collection(db, "users", user.uid, "transactions"), {
      title: "Room Service Order",
      price: total,
      type: "food",
      date: serverTimestamp(),
    });

    Alert.alert("Success", "Your food is being prepared!");
    router.back();
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to place order.");
  }
};

  const renderItem = ({ item }: { item: typeof MENU_DATA[0] }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        {cart[item.id] > 0 ? (
          <>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
              <MaterialIcons name="remove-circle" size={28} color={PURPLE_PRIMARY} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cart[item.id]}</Text>
          </>
        ) : null}
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
          <MaterialIcons name="add-circle" size={28} color={PURPLE_PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={MENU_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Checkout Bar */}
      {calculateTotal() > 0 && (
        <View style={styles.checkoutBar}>
          <View>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalPrice}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
            <Text style={styles.orderButtonText}>Place Order</Text>
            <MaterialIcons name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  listContent: { padding: 15, paddingBottom: 100 },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemCategory: { fontSize: 12, color: "#999", marginVertical: 2 },
  itemPrice: { fontSize: 15, fontWeight: "600", color: PURPLE_PRIMARY },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { marginHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  checkoutBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  totalLabel: { fontSize: 12, color: "#666" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#333" },
  orderButton: {
    backgroundColor: PURPLE_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  orderButtonText: { color: "white", fontWeight: "bold", marginRight: 5 },
});

export default FoodServiceScreen;