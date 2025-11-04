import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import { addBooking } from '../services/firestore';
import { auth } from '../config/firebase';

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [name, setName] = useState('');
  const [nights, setNights] = useState('1');

  const onConfirm = async () => {
    if (!name || !nights) {
      return Alert.alert('Missing info', 'Please fill all fields');
    }
    try {
      const userId = auth.currentUser?.uid || 'anonymous';
      await addBooking({ hotelId: hotel.id, userId, name, nights: Number(nights), price: hotel.price });
      navigation.navigate('BookingConfirmation', { hotel, name, nights: Number(nights) });
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>Book {hotel.name}</Text>
      <View style={{ height: spacing.lg }} />

      <Text style={styles.label}>Your Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter full name" />

      <View style={{ height: spacing.md }} />
      <Text style={styles.label}>Nights</Text>
      <TextInput style={styles.input} value={nights} onChangeText={setNights} keyboardType="numeric" />

      <View style={{ height: spacing.xl }} />
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2 },
  label: { ...typography.body, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default BookingScreen;
