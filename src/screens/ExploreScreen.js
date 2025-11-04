import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { colors, typography, spacing, commonStyles, borderRadius } from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import axios from 'axios';
import { getWeatherURL } from '../config/api';

const ExploreScreen = ({ navigation }) => {
  const [search, setSearch] = React.useState('');
  const [hotels, setHotels] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const loadHotels = async () => {
      const snap = await getDocs(collection(db, 'hotels'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setHotels(list);
    };
    loadHotels();

    // Simple fixed coords for demo (Johannesburg). Replace with geolocation if needed
    const loadWeather = async () => {
      try {
        const url = getWeatherURL(-26.2041, 28.0473);
        const res = await axios.get(url);
        setWeather(res.data);
      } catch (e) {
        // ignore weather errors in demo
      }
    };
    loadWeather();
  }, []);

  const filtered = hotels.filter(h => `${h.name} ${h.location}`.toLowerCase().includes(search.toLowerCase()));

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

      {weather && (
        <View style={styles.weatherCard}>
          <Text style={styles.weatherCity}>Johannesburg</Text>
          <Text style={styles.weatherTemp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.weatherDesc}>{weather.weather?.[0]?.description}</Text>
        </View>
      )}

      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={filtered}
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
  searchInput: { flex: 1 },
  weatherCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  weatherCity: { ...typography.h3 },
  weatherTemp: { ...typography.h2, color: colors.primary },
  weatherDesc: { ...typography.body, color: colors.textSecondary },
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
