import { create } from "zustand";

const useIncomeStore = create((set) => ({
  incomes: [], // ✅ always default to an empty array
  setIncomes: (data) => set({ incomes: data || [] }),
}));

export default useIncomeStore;
