import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';

const AddReviewScreen = ({ route, navigation }) => {
  const { hotel } = route.params || {};
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');

  const onSubmit = () => {
    if (!comment) {
      return Alert.alert('Validation', 'Please enter your comment');
    }
    Alert.alert('Thank you', 'Your review has been submitted');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>Add Review{hotel ? ` for ${hotel.name}` : ''}</Text>
      <Text style={styles.label}>Rating (1-5)</Text>
      <TextInput style={styles.input} value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Text style={styles.label}>Comment</Text>
      <TextInput style={[styles.input, { height: 100 }]} value={comment} onChangeText={setComment} multiline />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.lg },
  label: { ...typography.body, marginTop: spacing.md, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.xl },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default AddReviewScreen;
