import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotel } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: hotel.image }} style={{ width: '100%', height: 240 }} />
      <View style={{ padding: spacing.lg }}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.subtitle}>{hotel.location}</Text>
        <Text style={styles.body}>Experience comfort and luxury with modern amenities and excellent service.</Text>
        <View style={{ height: spacing.lg }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking', { hotel })}>
          <Text style={styles.buttonText}>Select Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
  body: { ...typography.body, lineHeight: 22 },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default HotelDetailsScreen;
