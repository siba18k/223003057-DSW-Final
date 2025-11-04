# Hotel Booking App (Expo) — DSW02B1 Final Assessment

This project runs on Expo Go. Follow the steps below to configure, run, and assess the app quickly.

## Prerequisites
- Node.js ≥ 16
- Expo CLI (npx works fine without global install)
- Expo Go app on your device (Android/iOS)
- Firebase project (Auth + Firestore enabled)
- OpenWeatherMap API key

## Install & Run (Expo)
1. Clone the repo
```bash
git clone https://github.com/siba18k/223003057-DSW-Final.git
cd 223003057-DSW-Final
```

2. Install dependencies
```bash
npm install
# Expo-managed native deps
npx expo install expo-status-bar react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage @react-native-community/datetimepicker expo-location
# JS deps
npm install axios firebase @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-vector-icons
```

3. Configure Firebase
- Open src/config/firebase.js and ensure the provided credentials are present (already added):
  - apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
- Enable Email/Password in Firebase Auth
- Create a Firestore database (in test mode for local assessment)

4. Configure Weather API
- Open src/config/api.js and set:
```js
export const WEATHER_API = {
  baseURL: 'https://api.openweathermap.org/data/2.5',
  apiKey: 'YOUR_OPENWEATHERMAP_API_KEY',
};
```

5. Start the app in Expo Go
```bash
npx expo start
```
- Scan the QR code with the Expo Go app

## Optional: Seed demo data
- Go to Profile → Admin Tools → Seed Hotels to populate Firestore with example hotels.
- For submission, you may remove Admin Tools or guard it behind a development flag.

## Project Structure
```
App.js
index.js
app.json
src/
  config/        # firebase.js, api.js
  constants/     # styles.js
  navigation/    # MainTabNavigator.js
  screens/       # Onboarding, Auth, Explore, Details, Booking, Reviews, Profile, Deals
  services/      # firestore, users, location (expo), seed
firestore.rules  # Suggested rules for testing
ASSESSOR_GUIDE.md
ExpoSetup.md
SubmissionChecklist.md
```

## Key Features (Expo-ready)
- Onboarding with images from Materials
- Authentication (Sign Up/Sign In/Forgot Password) via Firebase Auth
- Explore hotels from Firestore with search, sort (Price/Rating), loading/empty states
- Geolocation-based weather card using expo-location and OpenWeatherMap
- Booking flow with dates, rooms, total and auth guard; confirmation screen
- Reviews with star rating selector, real-time preview on hotel details
- Profile with display name edit and My Bookings joined with hotel names
- Deals tab powered by Fake Store API (loading/error handling)

## Firestore Rules (testing)
See firestore.rules in the repo; copy into Firebase console → Firestore → Rules and publish.

## Troubleshooting
- If icons don’t show, ensure react-native-vector-icons is installed (Expo supports it out of the box).
- If weather fails, verify your OpenWeatherMap API key and device network.
- If hotels list is empty, use Admin Tools → Seed Hotels, or add docs to hotels collection manually.

## Assessment Mapping
See ASSESSOR_GUIDE.md for a direct mapping of question paper requirements to implementation and test steps.
