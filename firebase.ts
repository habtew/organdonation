// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCw5J1GNjqX4Wx4QuM-Ez4AHII65v9DNWM",
    authDomain: "organ-33a4c.firebaseapp.com",
    projectId: "organ-33a4c",
    storageBucket: "organ-33a4c.appspot.com",
    messagingSenderId: "643001784932",
    appId: "1:643001784932:web:dc02271d3e63c65ee6dd71"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()