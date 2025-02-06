// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4DUMnylehA35nfj1bEt8Lv4bvgYUE5vQ",
  authDomain: "dictionary-lens-d7cb0.firebaseapp.com",
  projectId: "dictionary-lens-d7cb0",
  storageBucket: "dictionary-lens-d7cb0.firebasestorage.app",
  messagingSenderId: "760456573968",
  appId: "1:760456573968:web:acd9dd2509a60cb4b00695",
  measurementId: "G-74ER8QVQ02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
