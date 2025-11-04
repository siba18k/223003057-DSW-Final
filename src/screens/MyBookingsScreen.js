import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { spacing, typography } from '../constants/styles';

const MyBookingsScreen = () => {
  const bookings = [
    { id: '1', hotel: 'Oceanview Resort', date: '2025-12-01', nights: 2, total: 2598 },
  ];

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={typography.h2}>My Bookings</Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing.md }}
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: spacing.md }}>
            <Text style={typography.h3}>{item.hotel}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Nights: {item.nights}</Text>
            <Text>Total: R{item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyBookingsScreen;
