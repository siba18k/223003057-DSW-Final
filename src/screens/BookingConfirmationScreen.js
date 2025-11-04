import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../constants/styles';

const BookingConfirmationScreen = ({ route }) => {
  const { hotel, name, nights } = route.params;
  const total = hotel.price * nights;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg }}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.body}>{name}, your stay at {hotel.name} is reserved for {nights} night(s).</Text>
      <Text style={styles.total}>Total: R{total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.md },
  body: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg },
  total: { ...typography.h3, color: colors.primary },
});

export default BookingConfirmationScreen;
