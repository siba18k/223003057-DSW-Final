import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import { addReview, getReviewsForHotel } from '../services/firestore';
import { auth } from '../config/firebase';

const ReviewsScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!hotel) return;
    setLoading(true);
    try {
      const data = await getReviewsForHotel(hotel.id);
      setReviews(data);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [hotel?.id]);

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>Reviews{hotel ? ` for ${hotel.name}` : ''}</Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing.md }}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.user}>{item.userId || 'User'}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={!loading ? <Text style={{ color: colors.textSecondary }}>No reviews yet.</Text> : null}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReview', { hotel, onSubmitted: load })}>
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.md },
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  user: { ...typography.h3 },
  comment: { ...typography.body, color: colors.textSecondary },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.lg },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default ReviewsScreen;
