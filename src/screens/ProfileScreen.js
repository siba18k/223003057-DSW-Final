import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { seedHotels } from '../services/seed';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { updateUserDoc } from '../services/users';

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const user = auth.currentUser;

  const load = async () => {
    if (!user?.uid) return;
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const u = snap.data();
      setDisplayName(u.displayName || '');
    } else {
      setDisplayName(user.displayName || '');
    }
  };

  useEffect(() => { load(); }, [user?.uid]);

  const onSave = async () => {
    try {
      await updateProfile(user, { displayName });
      await updateUserDoc(user.uid, { displayName });
      Alert.alert('Saved', 'Profile updated');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const onLogout = async () => { await signOut(auth); };

  const onSeed = async () => {
    try { await seedHotels(); Alert.alert('Seed Complete', 'Sample hotels added.'); } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={styles.title}>My Account</Text>
      <Text style={{ ...typography.body, color: colors.textSecondary }}>Email: {user?.email}</Text>

      <Text style={styles.label}>Display Name</Text>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="Your name" />
      <TouchableOpacity style={styles.primary} onPress={onSave}><Text style={styles.primaryText}>Save</Text></TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={() => navigation.navigate('MyBookings')}>
        <Text style={styles.primaryText}>My Bookings</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl }} />
      <Text style={typography.h3}>Admin Tools</Text>
      <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.md }}>For testing. Remove before submission.</Text>
      <TouchableOpacity style={[styles.primary, { backgroundColor: colors.warning }]} onPress={onSeed}>
        <Text style={styles.primaryText}>Seed Hotels</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.primary, { backgroundColor: colors.danger }]} onPress={onLogout}>
        <Text style={styles.primaryText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.h2, marginBottom: spacing.lg },
  label: { ...typography.body, marginTop: spacing.lg, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md },
  primary: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.md },
  primaryText: { color: colors.background, fontWeight: '600' },
});

export default ProfileScreen;
