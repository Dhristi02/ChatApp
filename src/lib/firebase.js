import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-2ca2c.firebaseapp.com",
  projectId: "chat-app-2ca2c",
  storageBucket: "chat-app-2ca2c.firebasestorage.app",
  messagingSenderId: "739165628692",
  appId: "1:739165628692:web:e054cfc11bb6cab9e67a01"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();