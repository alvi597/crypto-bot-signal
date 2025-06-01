// client/src/firebase.js

// IMPORTANT: import initializeApp from 'firebase/app' NOT 'firebase'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRkgLzVFN7D9d85XiEKu0qN7FDl4ca9DU",
  authDomain: "hasnainbot-e652e.firebaseapp.com",
  projectId: "hasnainbot-e652e",
  storageBucket: "hasnainbot-e652e.appspot.com",
  messagingSenderId: "901251205831",
  appId: "1:901251205831:web:70a0e9a7731c229c264ce2",
  measurementId: "G-MTVDFZ1L78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth-related functions & provider for usage elsewhere
export { auth, provider, signInWithPopup, signOut };
export default app;
