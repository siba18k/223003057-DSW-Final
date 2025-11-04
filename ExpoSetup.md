// Expo + Firebase setup notes

- Install deps
  - npm i
  - npx expo install expo-status-bar react-native-screens react-native-safe-area-context
  - npx expo install @react-native-async-storage/async-storage
  - npm i axios firebase @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-vector-icons
  - npx expo install @react-native-community/datetimepicker

- Metro config for vector-icons (Expo supports out of the box). If icons don’t show on Android, ensure linking is not required on Expo.

- Permissions
  - If you later use geolocation via expo-location (recommended for Expo Go), install and switch to expo-location instead of @react-native-community/geolocation.

- Running
  - npx expo start
  - Scan QR with Expo Go
