// HOTELAR/app/(tabs)/bill.tsx

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 1. Firebase Imports
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const PURPLE_PRIMARY = '#5C2D91';
const TAX_RATE = 0.10; // 10%

const BillScreen = () => {
  const [loading, setLoading] = useState(true);
  const [charges, setCharges] = useState<any[]>([]);
  const CURRENT_USER_ROOM = "Room 405 - Deluxe Suite";

  // 2. Real-time Firebase Listener
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Connect to users/[uid]/transactions
    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firebaseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format the Firebase timestamp for display
        displayDate: doc.data().date?.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }) || 'Pending'
      }));
      
      setCharges(firebaseData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 3. Dynamic Calculation Logic
  const { subTotal, taxAmount, totalBalance } = useMemo(() => {
    // We check both 'amount' and 'price' to support different naming conventions
    const sub = charges.reduce((sum, charge) => sum + (Number(charge.price) || Number(charge.amount) || 0), 0);
    const tax = sub * TAX_RATE;
    const total = sub + tax;
    
    return { subTotal: sub, taxAmount: tax, totalBalance: total };
  }, [charges]);

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
    
 const handlePayNow = () => {
  if (totalBalance <= 0) {
    Alert.alert("No Balance", "You don't have any outstanding charges to pay.");
    return;
  }
  
  // 2. This will now work without the error
  router.push({
    pathname: "/(services)/payment",
    params: { total: totalBalance.toFixed(2) }
  });
};
  const handleDownloadBill = () => {
    Alert.alert("Download", "Your detailed PDF receipt is being generated.");
  };

  const BillItem = ({ name, date, amount }: { name: string, date: string, amount: number }) => (
    <View style={styles.chargeRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.chargeName}>{name}</Text>
        <Text style={styles.chargeDate}>{date}</Text>
      </View>
      <Text style={styles.chargeAmount}>{formatCurrency(amount)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Current Bill</Text>
          <Text style={styles.headerSubtitle}>{CURRENT_USER_ROOM}</Text>
          <TouchableOpacity onPress={handleDownloadBill} style={styles.downloadIcon}>
              <MaterialIcons name="file-download" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalCardLabel}>Total Balance</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalBalance)}</Text>
          
          <TouchableOpacity 
            style={[styles.payButton, totalBalance <= 0 && { opacity: 0.5 }]} 
            onPress={handlePayNow}
            disabled={totalBalance <= 0}
          >
            <Ionicons name="card" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>

        {/* Charges List */}
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesTitle}>Transactions</Text>
          
          {charges.length > 0 ? (
            charges.map(item => (
              <BillItem 
                key={item.id}
                name={item.title || item.name}
                date={item.displayDate}
                amount={item.price || item.amount}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions recorded yet.</Text>
          )}

          {charges.length > 0 && (
            <>
              <View style={styles.separator} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sub Total</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subTotal)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax ({TAX_RATE * 100}%)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(taxAmount)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalFinalAmount}>{formatCurrency(totalBalance)}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PURPLE_PRIMARY },
  scrollContent: { flexGrow: 1, backgroundColor: '#F7F7F7', paddingBottom: 20 },
  headerBackground: { backgroundColor: PURPLE_PRIMARY, paddingHorizontal: 25, paddingTop: 20, paddingBottom: 40, position: 'relative' },
  downloadIcon: { position: 'absolute', top: 20, right: 25 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 16, color: '#D4B8FF' },
  totalCard: { backgroundColor: '#EBE0FF', borderRadius: 15, marginHorizontal: 20, marginTop: -20, padding: 25, alignItems: 'center', elevation: 8 },
  totalCardLabel: { fontSize: 16, color: PURPLE_PRIMARY, marginBottom: 5, fontWeight: '600' },
  totalAmount: { fontSize: 36, fontWeight: 'bold', color: PURPLE_PRIMARY, marginBottom: 20 },
  payButton: { backgroundColor: PURPLE_PRIMARY, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  payButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  chargesContainer: { backgroundColor: 'white', borderRadius: 15, marginHorizontal: 20, marginTop: 20, padding: 25, elevation: 2 },
  chargesTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  chargeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  chargeName: { fontSize: 16, fontWeight: '600', color: '#333' },
  chargeDate: { fontSize: 14, color: '#666', marginTop: 2 },
  chargeAmount: { fontSize: 18, fontWeight: '600', color: '#333' },
  separator: { height: 1, backgroundColor: '#DDD', marginVertical: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 16, fontWeight: '500', color: '#333' },
  totalRow: { marginTop: 10, paddingTop: 15, borderTopWidth: 2, borderTopColor: PURPLE_PRIMARY },
  totalLabel: { fontSize: 20, fontWeight: 'bold', color: PURPLE_PRIMARY },
  totalFinalAmount: { fontSize: 20, fontWeight: 'bold', color: PURPLE_PRIMARY },
  emptyText: { textAlign: 'center', padding: 20, color: '#999', fontSize: 16 },
});