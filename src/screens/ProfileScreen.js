import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const ProfileScreen = ({ navigation }) => {
  const onLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>My Account</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyBookings')}>
        <Text style={styles.buttonText}>My Bookings</Text>
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
