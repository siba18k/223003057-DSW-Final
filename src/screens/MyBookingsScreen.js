import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { spacing, typography } from '../constants/styles';
import { getBookingsForUser } from '../services/firestore';
import { auth } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  const withHotel = async (b) => {
    const snap = await getDoc(doc(db, 'hotels', b.hotelId));
    const hotel = snap.exists() ? snap.data() : { name: b.hotelId };
    return { ...b, hotelName: hotel.name };
  };

  const load = async () => {
    const userId = auth.currentUser?.uid || 'anonymous';
    const data = await getBookingsForUser(userId);
    const enriched = await Promise.all(data.map(withHotel));
    setBookings(enriched);
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
            <Text style={typography.h3}>{item.hotelName}</Text>
            <Text>Guest: {item.name}</Text>
            <Text>Nights: {item.nights}</Text>
            <Text>Total: R{item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyBookingsScreen;
