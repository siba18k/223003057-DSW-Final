import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { colors, typography, spacing, borderRadius } from '../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserDoc } from '../services/users';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const valid = () => {
    if (!/\S+@\S+\.\S+/.test(email)) { Alert.alert('Invalid email'); return false; }
    if (password.length < 6 || !/[0-9]/.test(password)) { Alert.alert('Weak password: 6+ chars incl number'); return false; }
    if (!name) { Alert.alert('Enter your name'); return false; }
    return true;
  }

  const onSignUp = async () => {
    try {
      if (!valid()) return;
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await createUserDoc(cred.user);
      await AsyncStorage.setItem('hasCompletedOnboarding', 'false');
      Alert.alert('Success', 'Account created. Continue to onboarding.');
      navigation.navigate('SignIn');
    } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={typography.h2}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={onSignUp}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  button: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  buttonText: { color: colors.background, fontWeight: '600' },
});

export default SignUpScreen;
