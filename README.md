# Mobile Cloud Notes App

A React Native mobile cloud computing application with Firebase backend, offline cache, synchronization, and conflict handling support.

---

# Features

- User Authentication (Firebase Auth)
- Cloud Database (Firestore)
- Create, Edit, Delete Notes
- Offline Cache Support
- Automatic Cloud Synchronization
- Network Status Monitoring
- Search Notes
- Local Storage Support
- Conflict Handling using Last Write Wins strategy
- Sync Metadata Tracking

---

# Tech Stack

## Mobile Frontend
- React Native
- Expo
- TypeScript

## Cloud Backend
- Firebase Authentication
- Firebase Firestore Database

## Mobile Cloud Computing Features
- Offline-first architecture
- Cloud synchronization
- Local cache
- Network monitoring
- Automatic sync recovery

---

# Installation

## Clone repository

```bash
git https://github.com/Endritfx/Mobile-Notes
```

## Install dependencies

```bash
npm install
```

## Start project

```bash
npx expo start
```

---

# Firebase Setup

Create Firebase project:

- Enable Authentication
- Enable Email/Password login
- Create Firestore database

Create:

```env
.env
```

Add:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

---

# Testing

## Local Testing

- Login/Register works
- Notes CRUD works
- Offline cache works
- Search works
- Network monitoring works

## MCC Testing

- Disable internet connection
- Open notes from local cache
- Re-enable internet
- Automatic synchronization restores cloud sync

---

# Synchronization Strategy

The application uses:
- Local cache with AsyncStorage
- Firebase Firestore cloud synchronization
- Last Write Wins conflict handling strategy
- Automatic sync recovery after reconnection

---

# Screenshots

(Add screenshots here)

---

# Author

Endrit Demiri