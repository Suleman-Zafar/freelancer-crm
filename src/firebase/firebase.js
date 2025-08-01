import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBSSxvpDawGec5ykkZLDMQKFOOp0jMS5ys",
  authDomain: "leadstracker-b7aa5.firebaseapp.com",
  projectId: "leadstracker-b7aa5",
  storageBucket: "leadstracker-b7aa5.firebasestorage.app",
  messagingSenderId: "242635067026",
  appId: "1:242635067026:web:92e6ba3d20eee7b723e04b",
  measurementId: "G-T226S9591B"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut
};
