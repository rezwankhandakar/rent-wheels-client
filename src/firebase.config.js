// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
 apiKey: "AIzaSyABBuqdfgmXtSGKzNdrdjnxlUqxFgzG6iU",
  authDomain: "rent-wheels-34309.firebaseapp.com",
  projectId: "rent-wheels-34309",
  storageBucket: "rent-wheels-34309.firebasestorage.app",
  messagingSenderId: "533250578499",
  appId: "1:533250578499:web:fb0c8cda21b33ee03f9cf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
