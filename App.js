import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Styles
import { colors } from './src/constants/styles';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check onboarding status
    const checkOnboardingStatus = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        if (!hasCompletedOnboarding) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.log('Error checking onboarding status:', error);
      }
    };

    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setIsLoading(false);
      
      if (authenticatedUser && !showOnboarding) {
        checkOnboardingStatus();
      }
    });

    return unsubscribe;
  }, [showOnboarding]);

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background }
        }}
      >
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} onComplete={handleOnboardingComplete} />}
          </Stack.Screen>
        ) : user ? (
          // User is authenticated - show main app
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          // User is not authenticated - show auth screens
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;