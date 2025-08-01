import { create } from "zustand";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const useInvoiceStore = create((set) => ({
  invoices: [],

  // 🔄 Real-time Firestore sync
  fetchInvoices: () => {
    const unsubscribe = onSnapshot(
      collection(db, "invoices"),
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

    return unsubscribe; // Call this to stop listening
  },

  addInvoice: async (invoice) => {
    try {
      await addDoc(collection(db, "invoices"), invoice);
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  },

  updateInvoice: async (updatedInvoice) => {
    try {
      const docRef = doc(db, "invoices", updatedInvoice.id);
      await updateDoc(docRef, updatedInvoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  },

  deleteInvoice: async (id) => {
    try {
      await deleteDoc(doc(db, "invoices", id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  },
}));

export default useInvoiceStore;
