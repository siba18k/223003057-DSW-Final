import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { colors, spacing, typography, borderRadius } from '../constants/styles';
import { FAKE_STORE_API, ENDPOINTS } from '../config/api';

const DealsScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const res = await axios.get(`${FAKE_STORE_API.baseURL}${ENDPOINTS.fakeStore.products}`);
        setItems(res.data || []);
      } catch (e) {
        setError('Failed to load deals');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <View style={{ padding: spacing.lg }}><ActivityIndicator color={colors.primary} /></View>;
  if (error) return <View style={{ padding: spacing.lg }}><Text style={{ color: colors.danger }}>{error}</Text></View>;

  return (
    <FlatList
      contentContainerStyle={{ padding: spacing.lg }}
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
    />
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: spacing.sm, backgroundColor: '#eee' },
  title: { ...typography.body },
  price: { ...typography.h3, color: colors.primary },
});

export default DealsScreen;
