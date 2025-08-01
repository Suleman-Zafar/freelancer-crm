import { create } from "zustand";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,

  // Initialize auth state observer
  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ currentUser: user, loading: false });
    });
    return unsubscribe;
  },

  // Login user
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    set({ currentUser: userCredential.user });
  },

  // Signup user
  signup: async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: serverTimestamp(), // better than new Date()
    });

    set({ currentUser: user });
  },

  // Logout user
  logout: async () => {
    await signOut(auth);
    set({ currentUser: null });
  },
}));

export default useAuthStore;
