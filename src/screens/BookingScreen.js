import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addBooking } from '../services/firestore';
import { auth } from '../config/firebase';

const BookingScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('1');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const nights = Math.max(1, Math.ceil((checkOut - checkIn) / 86400000));
  const total = nights * Number(rooms || 1) * hotel.price;

  const onConfirm = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Sign in required', 'Please sign in to book');
      return navigation.navigate('SignIn');
    }
    if (!name || !rooms) return Alert.alert('Missing info', 'Please fill all fields');
    if (checkOut <= checkIn) return Alert.alert('Invalid dates', 'Check-out must be after check-in');

    try {
      await addBooking({
        hotelId: hotel.id,
        userId,
        name,
        nights,
        price: hotel.price,
      });
      navigation.navigate('BookingConfirmation', { hotel, name, nights });
    } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>Book {hotel.name}</Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter full name" />

      <Text style={styles.label}>Rooms</Text>
      <TextInput style={styles.input} value={rooms} onChangeText={setRooms} keyboardType="numeric" />

      <Text style={styles.label}>Check-in</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowIn(true)}>
        <Text>{checkIn.toDateString()}</Text>
      </TouchableOpacity>
      {showIn && (
        <DateTimePicker value={checkIn} mode="date" onChange={(_, d) => { setShowIn(false); if (d) setCheckIn(d); }} />
      )}

      <Text style={styles.label}>Check-out</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowOut(true)}>
        <Text>{checkOut.toDateString()}</Text>
      </TouchableOpacity>
      {showOut && (
        <DateTimePicker value={checkOut} mode="date" onChange={(_, d) => { setShowOut(false); if (d) setCheckOut(d); }} />
      )}

      <View style={{ height: spacing.lg }} />
      <Text style={styles.total}>Total: R{total}</Text>

      <View style={{ height: spacing.xl }} />
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.md },
  label: { ...typography.body, marginTop: spacing.md, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  total: { ...typography.h3, color: colors.primary },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.xl },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default BookingScreen;
