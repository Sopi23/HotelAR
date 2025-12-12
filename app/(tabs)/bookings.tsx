// HOTELAR/app/(tabs)/booking.tsx

import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE_PRIMARY = '#5C2D91';

// --- Dummy Data ---
const dummyBookings = [
  {
    id: 1,
    room: 'Deluxe Suit 405',
    status: 'Active',
    dates: 'Jan 20, 2025 - Jan 25, 2025',
    guests: 2,
  },
  {
    id: 2,
    room: 'Ocean View Room 302',
    status: 'Upcoming',
    dates: 'Feb 10, 2025 - Feb 15, 2025',
    guests: 2,
  },
  {
    id: 3,
    room: 'Standard Room 105',
    status: 'Completed',
    dates: 'Dec 20, 2025 - Dec 25, 2025',
    guests: 1,
  },
];
// --- END Dummy Data ---

const MyBookingsScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = dummyBookings.filter(booking => {
    const statusMatch = activeFilter === 'All' || booking.status === activeFilter;
    const searchMatch = booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleAction = (action: 'Details' | 'Modify', bookingId: number) => {
    const booking = dummyBookings.find(b => b.id === bookingId);
    if (action === 'Details') {
      Alert.alert('View Details', `Showing details for ${booking?.room}`);
    } else if (action === 'Modify') {
      Alert.alert('Modify Booking', `Opening modification for ${booking?.room}`);
    }
  };

  const BookingCard = ({ booking }: { booking: typeof dummyBookings[0] }) => {
    let statusColor = '#666';
    if (booking.status === 'Active') {
      statusColor = '#6B59CC'; // Blue/Purple
    } else if (booking.status === 'Upcoming') {
      statusColor = '#FFD700'; // Yellow/Gold
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.roomName}>{booking.room}</Text>
          <MaterialIcons name="location-pin" size={20} color="#666" />
        </View>

        <View style={[styles.statusTag, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialIcons name="calendar-today" size={18} color="#666" />
          <Text style={styles.detailText}>{booking.dates}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="person" size={18} color="#666" />
          <Text style={styles.detailText}>{booking.guests} Guests</Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAction('Details', booking.id)}
          >
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
          {booking.status !== 'Completed' && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAction('Modify', booking.id)}
            >
              <Text style={styles.actionButtonText}>Modify</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>View and manage your stays</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by room or date..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Filters */}
        <View style={styles.filterContainer}>
          {['All', 'Active', 'Upcoming', 'Completed'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Booking Cards */}
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <Text style={styles.noResultsText}>No bookings match your criteria.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_PRIMARY,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerBackground: {
    backgroundColor: PURPLE_PRIMARY,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D4B8FF',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F7F7F7',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: 'white',
  },
  filterButtonActive: {
    borderColor: PURPLE_PRIMARY,
    backgroundColor: PURPLE_PRIMARY,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusTag: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PURPLE_PRIMARY,
    marginRight: 15,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE_PRIMARY,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
});