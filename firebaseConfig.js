// HOTELAR/utils/firebaseConfig.js

// HOTELAR/utils/firebaseConfig.js

// 1. Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// You can import other services here if needed (e.g., getMessaging, getAnalytics)
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnpS7GbGHZIPve2EXGiTcMfM7Z1L0UqgE",
  authDomain: "hotelar-d1b78.firebaseapp.com",
  projectId: "hotelar-d1b78",
  storageBucket: "hotelar-d1b78.firebasestorage.app",
  messagingSenderId: "465657927948",
  appId: "1:465657927948:web:2de6e87d592bcfaa6cd129",
  measurementId: "G-YL34HTSN7J"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

