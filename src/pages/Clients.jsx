import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import MainContent from '../components/layout/MainContent';
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import Footer from '../components/layout/Footer';
import useClientStore from '../stores/clientStore';

const Clients = () => {
  const { clients, fetchClients, deleteClient } = useClientStore();

  useEffect(() => {
    const unsubscribe = fetchClients(); 
    return () => unsubscribe(); 
  }, []);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Budget", key: "budget" },
    { label: "Project", key: "projectName" },
    { label: "Status", key: "status" },
    {
      label: "Actions",
      key: "actions",
      align: "right",
      render: (client) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline">
            <Edit size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-orange-500"
            onClick={() => deleteClient(client.id)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <MainContent
        title="Clients"
        headers={headers}
        data={clients}
        collectionName="clients"
      />
      <Footer />
    </div>
  );
};

export default Clients;
