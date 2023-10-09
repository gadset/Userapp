// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw0alWBSjWJ8lqaqPAXhARE1ED6OOSrBc",
  authDomain: "verify-77919.firebaseapp.com",
  projectId: "verify-77919",
  storageBucket: "verify-77919.appspot.com",
  messagingSenderId: "430962749459",
  appId: "1:430962749459:web:cce9b7fcb50abbaca14fe6",
  measurementId: "G-HLMC8550M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)