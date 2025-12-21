// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFpjbR9cQldF0NhBc5s3hpdLlK4luJh_I",
  authDomain: "portfolio-cfa73.firebaseapp.com",
  projectId: "portfolio-cfa73",
  storageBucket: "portfolio-cfa73.firebasestorage.app",
  messagingSenderId: "22321318574",
  appId: "1:22321318574:web:946ec4f46966351e26bb3f",
  measurementId: "G-KW5GY069C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and export it
export const db = getFirestore(app);

export { app, analytics };