// stores/dashboardStore.js
import { create } from "zustand";

const useDashboardStore = create((set) => ({
  incomeSummary: [],     // [{ month: '2025-08', income: 2000 }, ...]
  totalIncome: 0,
  totalClients: 0,
  totalProjects: 0,
  totalInvoices: 0,

  updateDashboardStats: ({ invoices, clients, projects }) => {
    const paidInvoices = invoices.filter((inv) => inv.status === "Paid");
    const monthlyIncomeMap = {};

    let total = 0;
    paidInvoices.forEach((inv) => {
      const date = new Date(inv.paidDate);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const amount = Number(inv.amount) || 0;

      total += amount;
      monthlyIncomeMap[month] = (monthlyIncomeMap[month] || 0) + amount;
    });

    const incomeSummary = Object.entries(monthlyIncomeMap).map(([month, income]) => ({
      month,
      income,
    }));

    incomeSummary.sort((a, b) => a.month.localeCompare(b.month));

    set({
      totalIncome: total,
      incomeSummary,
      totalClients: clients.length,
      totalProjects: projects.length,
      totalInvoices: invoices.length,
    });
  },
}));

export default useDashboardStore;
