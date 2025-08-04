import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import useProjectStore from "../stores/projectStore";
import useAuthStore from '../stores/authStore';

const Projects = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const loading = useAuthStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.currentUser);
  const { projects, fetchProjects, deleteProject } = useProjectStore();

  useEffect(() => {
    const unsubscribeAuth = initAuth?.();
    return () => {
      if (typeof unsubscribeAuth === "function") unsubscribeAuth();
    };
  }, [initAuth]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = fetchProjects();
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [currentUser]);

  const headers = [
    { label: "Client", key: "client" },
    { label: "Project", key: "projectName" },
    { label: "Budget", key: "budget" },
    { label: "Deadline", key: "deadline" },
    { label: "Status", key: "status" },
    {
      label: "Actions",
      key: "actions",
      align: "right",
      render: (project) => (
        <div className="flex gap-2 justify-end">
          <button
            className="border px-2 py-1 text-yellow-600 text-sm"
            onClick={() => console.log("Implement edit")}
          >
            Edit
          </button>
          <button
            className="border px-2 py-1 text-red-600 text-sm"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading authentication...</div>;
  if (!currentUser) return <div>Please log in</div>;

  return (
    <div>
      <Navbar />
      <MainContent title="Projects" headers={headers} data={projects} collectionName="projects" />
      <Footer />
    </div>
  );
};

export default Projects;
