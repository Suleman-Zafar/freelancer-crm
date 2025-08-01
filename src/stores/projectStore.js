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

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  // Real-time fetch with Firestore listener
  fetchProjects: () => {
    set({ loading: true });

    const unsubscribe = onSnapshot(
      collection(db, "projects"),
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

    return unsubscribe; // For cleanup
  },

  // Add a new project
  addProject: async (project) => {
    try {
      await addDoc(collection(db, "projects"), project);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  },

  // Update an existing project
  updateProject: async (updatedProject) => {
    try {
      const docRef = doc(db, "projects", updatedProject.id);
      await updateDoc(docRef, updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  },

  // Delete a project
  deleteProject: async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },

  // Useful if syncing manually from onSnapshot in another place
  setProjects: (projects) => set({ projects }),
}));

export default useProjectStore;
