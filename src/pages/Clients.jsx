import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import MainContent from '../components/layout/MainContent';
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import Footer from '../components/layout/Footer';
import useClientStore from '../stores/clientStore';
import useAuthStore from '../stores/authStore';

const Clients = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const loading = useAuthStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.currentUser);
  const { clients, fetchClients, deleteClient } = useClientStore();

  useEffect(() => {
    const unsubscribeAuth = initAuth?.();
    return () => {
      if (typeof unsubscribeAuth === "function") unsubscribeAuth();
    };
  }, [initAuth]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = fetchClients(); 
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [currentUser]);

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

  if (loading) return <div>Loading authentication...</div>;
  if (!currentUser) return <div>Please log in</div>;

  return (
    <div>
      <Navbar />
      <MainContent title="Clients" headers={headers} data={clients} collectionName="clients" />
      <Footer />
    </div>
  );
};

export default Clients;
