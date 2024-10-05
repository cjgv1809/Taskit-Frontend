import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4aos3PHhe8d31iXaX_DuhMJBFKd3fLNs",
  authDomain: "taskit-d1c33.firebaseapp.com",
  projectId: "taskit-d1c33",
  storageBucket: "taskit-d1c33.appspot.com",
  messagingSenderId: "816353236194",
  appId: "1:816353236194:web:97c5770d10d515e3bc3abb",
};

// Initialize Firebase if it hasn't been initialized before
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
