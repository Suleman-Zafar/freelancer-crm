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

  initAuth: () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("🔥 Auth state changed:", user);
        set({ currentUser: user, loading: false });
      });

      return unsubscribe; // ✅ always return cleanup
    } catch (error) {
      console.error("initAuth error:", error);
      return () => {}; // ✅ fallback noop
    }
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    set({ currentUser: userCredential.user });
  },

  signup: async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    });

    set({ currentUser: user });
  },

  logout: async () => {
    await signOut(auth);
    set({ currentUser: null });
  },
}));

export default useAuthStore;
