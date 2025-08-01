import { create } from "zustand";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const useClientStore = create((set) => ({
  clients: [],
  loading: false,

  // Real-time fetch with Firestore listener
  fetchClients: () => {
    set({ loading: true });

    const unsubscribe = onSnapshot(
      collection(db, "clients"),
      (snapshot) => {
        const clients = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ clients, loading: false });
      },
      (error) => {
        console.error("Error fetching clients:", error);
        set({ loading: false });
      }
    );

    return unsubscribe; // For cleanup
  },

  // Add a new client to Firestore
  addClient: async (client) => {
    try {
      await addDoc(collection(db, "clients"), client);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  },

  // Update an existing client
  updateClient: async (updatedClient) => {
    try {
      const docRef = doc(db, "clients", updatedClient.id);
      await updateDoc(docRef, updatedClient);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  },

  // Delete a client
  deleteClient: async (id) => {
    try {
      await deleteDoc(doc(db, "clients", id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  },
}));

export default useClientStore;
