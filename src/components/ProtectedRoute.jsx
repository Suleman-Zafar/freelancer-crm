import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
