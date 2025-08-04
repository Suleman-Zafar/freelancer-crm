import React, { useEffect } from "react";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Income from "./pages/Income";
import Projects from "./pages/projects";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HireMe from "./pages/HireMe";
import useAuthStore from "./stores/authStore";
const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
   const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => unsubscribe();
  }, [initAuth]);
  if (loading) return <div>Loading authentication...</div>;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hire-me"
          element={
            <ProtectedRoute>
              <HireMe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} /> */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
