// HOTELAR/app/(tabs)/bill.tsx

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE_PRIMARY = '#5C2D91';

// --- Dummy Data (Simulating dynamic fetching) ---
const CURRENT_USER_ROOM = "Room 405 - Deluxe Suite";
const TAX_RATE = 0.10; // 10%

const CHARGES_DATA = [
  { id: 1, name: "Room charges", date: "Jan 20 - 25", amount: 850.00 },
  { id: 2, name: "Room Services", date: "Jan 22", amount: 45.00 },
  { id: 3, name: "Minibar", date: "Jan 21", amount: 28.50 },
  { id: 4, name: "Spa services", date: "Jan 23", amount: 120.00 },
  { id: 5, name: "Restaurant", date: "Jan 22", amount: 67.50 },
];
// --- END Dummy Data ---

const BillScreen = () => {
    
  // --- Calculation Logic ---
  const { subTotal, taxAmount, totalBalance } = useMemo(() => {
    const subTotal = CHARGES_DATA.reduce((sum, charge) => sum + charge.amount, 0);
    const taxAmount = subTotal * TAX_RATE;
    const totalBalance = subTotal + taxAmount;
    
    return { subTotal, taxAmount, totalBalance };
  }, []); // Recalculate only if data structure changes

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
    
  const handlePayNow = () => {
    Alert.alert("Payment Gateway", `Proceeding to payment for ${formatCurrency(totalBalance)}.`);
    // In a real app, this would navigate to a payment screen.
  };

  const handleDownloadBill = () => {
    Alert.alert("Download", "Bill download initiated.");
  };

  const BillItem = ({ name, date, amount }: { name: string, date: string, amount: number }) => (
    <View style={styles.chargeRow}>
      <View>
        <Text style={styles.chargeName}>{name}</Text>
        <Text style={styles.chargeDate}>{date}</Text>
      </View>
      <Text style={styles.chargeAmount}>{formatCurrency(amount)}</Text>
    </View>
  );

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
          
          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            <Ionicons name="card" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>

        {/* Charges List */}
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesTitle}>Charges</Text>
          
          {/* Itemized Charges */}
          {CHARGES_DATA.map(item => (
            <BillItem 
              key={item.id}
              name={item.name}
              date={item.date}
              amount={item.amount}
            />
          ))}

          {/* Totals */}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_PRIMARY,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
    paddingBottom: 20,
  },
  headerBackground: {
    backgroundColor: PURPLE_PRIMARY,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    position: 'relative',
  },
  downloadIcon: {
      position: 'absolute',
      top: 20,
      right: 25,
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
  totalCard: {
    backgroundColor: '#EBE0FF', // Light purple background for total
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: -20, // Pull card up into the header area
    padding: 25,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalCardLabel: {
    fontSize: 16,
    color: PURPLE_PRIMARY,
    marginBottom: 5,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: PURPLE_PRIMARY,
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: PURPLE_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chargesContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  chargesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  chargeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chargeDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  chargeAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
      height: 1,
      backgroundColor: '#DDD',
      marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: PURPLE_PRIMARY,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PURPLE_PRIMARY,
  },
  totalFinalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PURPLE_PRIMARY,
  },
});