import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { seedHotels } from '../services/seed';

const ProfileScreen = ({ navigation }) => {
  const onLogout = async () => {
    await signOut(auth);
  };

  const onSeed = async () => {
    try {
      await seedHotels();
      Alert.alert('Seed Complete', 'Sample hotels have been added.');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>My Account</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyBookings')}>
        <Text style={styles.buttonText}>My Bookings</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl }} />
      <Text style={typography.h3}>Admin Tools</Text>
      <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.md }}>
        These tools are for local testing. Remove before submission.
      </Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.warning }]} onPress={onSeed}>
        <Text style={styles.buttonText}>Seed Hotels</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.danger }]} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.lg },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.md },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default ProfileScreen;
