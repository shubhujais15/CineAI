// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDptpyKqKTvQ9GqLht8JAAvqUj2FXXkiMI",
  authDomain: "cineai-15.firebaseapp.com",
  projectId: "cineai-15",
  storageBucket: "cineai-15.appspot.com",
  messagingSenderId: "121326431604",
  appId: "1:121326431604:web:46d2f8e2614d510aef9021",
  measurementId: "G-L8J367Q24C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();