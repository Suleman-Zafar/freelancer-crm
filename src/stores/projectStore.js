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

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  fetchProjects: () => {
    set({ loading: true });

    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    const q = query(
      collection(db, "projects"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ projects, loading: false });
      },
      (error) => {
        console.error("Error fetching projects:", error);
        set({ loading: false });
      }
    );

    return unsubscribe;
  },

  addProject: async (project) => {
    const { currentUser } = useAuthStore.getState();
    if (!currentUser) return;

    try {
      await addDoc(collection(db, "projects"), {
        ...project,
        userId: currentUser.uid,
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  },

  updateProject: async (updatedProject) => {
    try {
      const docRef = doc(db, "projects", updatedProject.id);
      await updateDoc(docRef, updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  },

  deleteProject: async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },

  setProjects: (projects) => set({ projects }),
}));

export default useProjectStore;
