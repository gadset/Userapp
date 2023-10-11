// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_xFelva7LZ0acor-ZM7gSDkLXpJxI5lI",
  authDomain: "webpush-6fd79.firebaseapp.com",
  projectId: "webpush-6fd79",
  storageBucket: "webpush-6fd79.appspot.com",
  messagingSenderId: "147881428135",
  appId: "1:147881428135:web:4677670c981448aa874782",
  measurementId: "G-X02NZSZQNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const auth = getAuth(app)