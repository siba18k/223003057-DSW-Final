# Assessor Guide: DSW02B1 Final Assessment (Hotel Booking App)

This guide maps each requirement in the question paper to the app’s implementation with exact screens and files, plus quick test steps.

Section A: Mobile UI Implementation (60)
- A1. Onboarding (5)
  - Where: src/screens/OnboardingScreen.js
  - Test: Launch in Expo Go → swipe through 3 slides → Skip/Next/Get Started. After Sign Up, onboarding flag resets on first login.
- A2. Authentication (15)
  - Where: src/screens/SignInScreen.js, src/screens/SignUpScreen.js, src/screens/ForgotPasswordScreen.js
  - Test: Sign Up (with name) → Sign In → Forgot Password email flow. Auth state handled in App.js.
- A3. Explore (15)
  - Where: src/screens/ExploreScreen.js
  - Test: Hotels list loads from Firestore; search filter; sort by Price/Rating; weather card (expo-location → OpenWeatherMap); tap to details.
- A4. Booking (15)
  - Where: src/screens/BookingScreen.js, BookingConfirmationScreen.js
  - Test: Select Room → enter name, pick dates, rooms, total calculation, confirm; unauthenticated users are redirected to Sign In.
- A5. Reviews (5)
  - Where: src/screens/ReviewsScreen.js, AddReviewScreen.js, HotelDetailsScreen.js
  - Test: Hotel Details shows “Recent Reviews” (real-time), Add Review uses star selector; submitting writes to Firestore.
- A6. Profile (5)
  - Where: src/screens/ProfileScreen.js, MyBookingsScreen.js
  - Test: Profile shows email, edit display name, save; My Bookings lists user bookings with hotel names.

Section B: Backend Integration (40)
- B1. Firebase Config (10)
  - Where: src/config/firebase.js, firestore.rules
  - Test: Auth & Firestore work; publish rules from console.
- B2. Firebase Auth (10)
  - Where: Sign In/Up/Reset + onAuthStateChanged in App.js
  - Test: Create account, login persistence, guarded booking/reviews.
- B3. Data Storage (10)
  - Where: src/services/firestore.js (reviews/bookings), src/services/users.js
  - Test: Create/read bookings, reviews, and user profile docs.
- B4. Third-Party APIs (10)
  - Where: src/config/api.js, Explore weather card, src/screens/DealsScreen.js
  - Test: Weather displays; Deals tab loads products with loading/error states.

Seed Data
- Admin Tools (Profile → Seed Hotels) for local testing; remove before submission if required.

Run Instructions (Expo)
- npm install
- npx expo install expo-status-bar react-native-screens react-native-safe-area-context
- npx expo install @react-native-async-storage/async-storage @react-native-community/datetimepicker expo-location
- npm install axios firebase @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-vector-icons
- Add OpenWeatherMap key in src/config/api.js
- npx expo start and open in Expo Go

Notes
- Free tier Firebase used (Auth + Firestore). No advanced paid features.
- Security rules in firestore.rules target least privilege for testing.
