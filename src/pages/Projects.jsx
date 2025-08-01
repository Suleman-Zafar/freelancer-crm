import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import useProjectStore from "../stores/projectStore";

const Projects = () => {
  const { projects, fetchProjects, deleteProject } = useProjectStore();

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

  useEffect(() => {
    const unsubscribe = fetchProjects();
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      <MainContent
        title="Projects"
        headers={headers}
        data={projects}
        collectionName="projects"
      />
      <Footer />
    </div>
  );
};

export default Projects;
