import { create } from "zustand";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import useAuthStore from "./authStore";

const useInvoiceStore = create((set) => ({
  invoices: [],

  fetchInvoices: () => {
    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    const q = query(
      collection(db, "invoices"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const invoices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ invoices });
      },
      (error) => {
        console.error("Error fetching invoices:", error);
      }
    );

    return unsubscribe;
  },

  addInvoice: async (invoice) => {
    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    await addDoc(collection(db, "invoices"), {
      ...invoice,
      userId: currentUser.uid,
    });
  },

  updateInvoice: async (updatedInvoice) => {
    const docRef = doc(db, "invoices", updatedInvoice.id);
    await updateDoc(docRef, updatedInvoice);
  },

  deleteInvoice: async (id) => {
    await deleteDoc(doc(db, "invoices", id));
  },
}));

export default useInvoiceStore;
