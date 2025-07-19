// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmSspdtoGw6vqmH2Rqptv-UTavn_slh2w",
  authDomain: "streamlistauth.firebaseapp.com",
  projectId: "streamlistauth",
  storageBucket: "streamlistauth.firebasestorage.app",
  messagingSenderId: "734913986135",
  appId: "1:734913986135:web:f59f5f55132d8515126d12",
  measurementId: "G-4S1MN346MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();