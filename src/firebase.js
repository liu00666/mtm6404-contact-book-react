import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArlP129zUUze7TaOJe7cbbeGtQqgIj_wA",
  authDomain: "contact-book-5c55e.firebaseapp.com",
  projectId: "contact-book-5c55e",
  storageBucket: "contact-book-5c55e.firebasestorage.app",
  messagingSenderId: "940970236203",
  appId: "1:940970236203:web:695232e3136e73e891cd6e",
  measurementId: "G-0ZLCDGE4KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export default app; 