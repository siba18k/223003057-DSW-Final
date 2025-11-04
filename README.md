# Hotel Booking App - DSW02B1 Final Assessment

## Overview
A complete React Native hotel booking application built with modern best practices, including Firebase integration and third-party API consumption.

## Features
- **Onboarding Flow**: Multi-screen introduction for new users
- **Authentication**: Sign Up, Sign In, and Forgot Password
- **Hotel Listings**: Browse and filter hotels
- **Booking System**: Complete reservation flow
- **Reviews**: User-generated hotel reviews
- **Profile Management**: User account and booking history
- **Firebase Integration**: Authentication and data storage
- **Third-party APIs**: Weather and hotel data

## Tech Stack
- React Native
- Firebase (Auth & Firestore)
- React Navigation
- AsyncStorage
- Third-party APIs (OpenWeatherMap, Fake Store API)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment
- Firebase account
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/siba18k/223003057-DSW-Final.git
cd 223003057-DSW-Final
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install
```

4. Firebase Setup:
   - Create a new Firebase project
   - Enable Email/Password authentication
   - Create a Firestore database
   - Add your configuration to `src/config/firebase.js`

5. API Keys:
   - Get OpenWeatherMap API key from https://openweathermap.org/api
   - Add to `src/config/api.js`

6. Run the app:
```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── services/          # API calls and Firebase services
├── config/           # Configuration files
├── utils/           # Utility functions
├── assets/         # Images and static assets
└── constants/     # App constants and styles
```

## Assignment Requirements Fulfilled

### Section A: Mobile UI Implementation (60 marks)
- ✅ A1. Onboarding Screens (5 marks)
- ✅ A2. Authentication Screens (15 marks)
- ✅ A3. Explore Page - Hotel Listings (15 marks)
- ✅ A4. Booking Flow (15 marks)
- ✅ A5. Reviews (5 marks)
- ✅ A6. Profile Page (5 marks)

### Section B: Backend Integration (40 marks)
- ✅ B1. Firebase Configuration (10 marks)
- ✅ B2. Firebase Authentication Integration (10 marks)
- ✅ B3. Data Storage in Firebase (10 marks)
- ✅ B4. Third-Party API Integration (10 marks)

## Student Information
- **Name**: Sibahle Dube
- **Student Number**: 223003057
- **Module**: DSW02B1 - Development Software 2B
- **Assessment Date**: November 4, 2025