// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore only
export const db = getFirestore(app);
