import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useInvoiceStore from "@/stores/invoiceStore";
import useClientStore from "@/stores/clientStore";
import useProjectStore from "@/stores/projectStore";
import useDashboardStore from "@/stores/dashboardStore";
import useAuthStore from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const loading = useAuthStore((state) => state.loading);
  const currentUser = useAuthStore((state) => state.currentUser);

  const invoices = useInvoiceStore((state) => state.invoices);
  const clients = useClientStore((state) => state.clients);
  const projects = useProjectStore((state) => state.projects);

  const {
    incomeSummary,
    totalIncome,
    totalClients,
    totalProjects,
    totalInvoices,
    updateDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    const unsubscribeAuth = initAuth?.();
    return () => {
      if (typeof unsubscribeAuth === "function") unsubscribeAuth();
    };
  }, [initAuth]);

  useEffect(() => {
    updateDashboardStats({ invoices, clients, projects });
  }, [invoices, clients, projects]);

  if (loading) return <div>Loading authentication...</div>;
  if (!currentUser) return <div>Please log in</div>;

  return (
    <>
      <Navbar />
      <div className="px-6 pt-4">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Welcome, {currentUser.email}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Summary Cards */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-1">Total Income</h2>
            <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-1">Total Clients</h2>
            <p className="text-2xl font-bold">{totalClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-1">Total Projects</h2>
            <p className="text-2xl font-bold">{totalProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-1">Total Invoices</h2>
            <p className="text-2xl font-bold">{totalInvoices}</p>
          </CardContent>
        </Card>

        {/* Chart */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={incomeSummary}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  barCategoryGap={20}
                  barSize={100}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
