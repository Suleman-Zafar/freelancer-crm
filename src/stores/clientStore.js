import { create } from "zustand";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import useAuthStore from "./authStore";

const useClientStore = create((set) => ({
  clients: [],
  loading: false,

  fetchClients: () => {
    set({ loading: true });

    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    const q = query(
      collection(db, "clients"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
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

    return unsubscribe;
  },

  addClient: async (client) => {
    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    await addDoc(collection(db, "clients"), {
      ...client,
      userId: currentUser.uid,
    });
  },

  updateClient: async (updatedClient) => {
    const docRef = doc(db, "clients", updatedClient.id);
    await updateDoc(docRef, updatedClient);
  },

  deleteClient: async (id) => {
    await deleteDoc(doc(db, "clients", id));
  },
   setItems: (newItems) => set({ clients: newItems }),
}));

export default useClientStore;
