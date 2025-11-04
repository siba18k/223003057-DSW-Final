import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { colors, typography, spacing, commonStyles, borderRadius } from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ExploreScreen = ({ navigation }) => {
  const [search, setSearch] = React.useState('');

  const hotels = [
    { id: '1', name: 'Oceanview Resort', location: 'Cape Town', price: 1299, rating: 4.6, image: 'https://picsum.photos/seed/hotel1/600/400' },
    { id: '2', name: 'Safari Lodge', location: 'Kruger Park', price: 1899, rating: 4.8, image: 'https://picsum.photos/seed/hotel2/600/400' },
    { id: '3', name: 'City Lights Hotel', location: 'Johannesburg', price: 999, rating: 4.2, image: 'https://picsum.photos/seed/hotel3/600/400' },
  ];

  const renderHotel = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('HotelDetails', { hotel: item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={styles.spaceBetween}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.rating}>
            <Icon name="star" color="#f5a623" size={16} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{item.location}</Text>
        <View style={styles.spaceBetween}>
          <Text style={styles.price}>R{item.price}/night</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking', { hotel: item })}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={styles.searchRow}>
        <Icon name="search" size={24} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hotels, cities..."
          value={search}
          onChangeText={setSearch}
        />
        <Icon name="tune" size={24} color={colors.textSecondary} />
      </View>
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={renderHotel}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    height: 48,
    gap: spacing.md,
  },
  searchInput: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: '100%', height: 160 },
  cardContent: { padding: spacing.md },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...typography.h3 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  price: { ...typography.h3, color: colors.primary },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { ...typography.body },
  bookButton: { backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 16, borderRadius: borderRadius.md },
  bookButtonText: { color: colors.background, fontWeight: '600' },
});

export default ExploreScreen;
