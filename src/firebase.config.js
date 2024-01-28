// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAfxmcgmSEJP7m4u0vtwYVq_9g4dgU1iWk",
  authDomain: "gadset-6fb3d.firebaseapp.com",
  projectId: "gadset-6fb3d",
  storageBucket: "gadset-6fb3d.appspot.com",
  messagingSenderId: "176728143278",
  appId: "1:176728143278:web:abcd3fab95d04ef987443f",
  measurementId: "G-62W1Y5314Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const storage = getStorage(app);

export const auth = getAuth(app)