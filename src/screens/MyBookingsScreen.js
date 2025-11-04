import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { spacing, typography } from '../constants/styles';
import { getBookingsForUser } from '../services/firestore';
import { auth } from '../config/firebase';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const userId = auth.currentUser?.uid || 'anonymous';
    const data = await getBookingsForUser(userId);
    setBookings(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={typography.h2}>My Bookings</Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing.md }}
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: spacing.md }}>
            <Text style={typography.h3}>{item.name}</Text>
            <Text>Hotel: {item.hotelId}</Text>
            <Text>Nights: {item.nights}</Text>
            <Text>Total: R{item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyBookingsScreen;
