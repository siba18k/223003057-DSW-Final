import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';

const mockReviews = [
  { id: '1', user: 'Alice', rating: 5, comment: 'Amazing stay!' },
  { id: '2', user: 'Sipho', rating: 4, comment: 'Very comfortable and clean.' },
];

const ReviewsScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
  const [reviews, setReviews] = useState(mockReviews);

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>Reviews{hotel ? ` for ${hotel.name}` : ''}</Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing.md }}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReview', { hotel })}>
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
