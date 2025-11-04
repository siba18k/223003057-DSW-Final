import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(r => r.hotelId === hotel.id)
        .slice(0, 3);
      setReviews(list);
    });
    return () => unsub();
  }, [hotel?.id]);

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

        <View style={{ height: spacing.xl }} />
        <View style={styles.rowBetween}>
          <Text style={typography.h3}>Recent Reviews</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Reviews', { hotel })}>
            <Text style={{ color: colors.primary }}>See all</Text>
          </TouchableOpacity>
        </View>
        {reviews.length === 0 ? (
          <Text style={{ color: colors.textSecondary, marginTop: spacing.sm }}>No reviews yet.</Text>
        ) : (
          <FlatList
            style={{ marginTop: spacing.md }}
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.review}>
                <Icon name="star" size={16} color="#f5a623" />
                <Text style={{ marginLeft: 6 }}>{item.rating} · {item.comment}</Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity style={[styles.button, { marginTop: spacing.md }]} onPress={() => navigation.navigate('AddReview', { hotel })}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
  body: { ...typography.body, lineHeight: 22 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  buttonText: { color: colors.background, fontWeight: '600' },
  review: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
});

export default HotelDetailsScreen;
