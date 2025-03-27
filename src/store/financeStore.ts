import {
  type CurrencyWithAcronym,
  type FinanceAPIResponse,
  type StockWithAcronym,
} from "@/types/finance";
import { create } from "zustand";

type FinanceStore = {
  currencies: CurrencyWithAcronym[];
  stocks: StockWithAcronym[];
  error: string | null;
  loading: boolean;
  responseHistory: (FinanceAPIResponse & { date: Date })[];
  setCurrencies: (currencies: CurrencyWithAcronym[]) => void;
  setStocks: (stocks: StockWithAcronym[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setResponseCache: (data: FinanceAPIResponse) => void;
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  currencies: [],
  stocks: [],
  error: null,
  loading: true,
  responseHistory: [],
  setCurrencies: (currencies) => set({ currencies }),
  setStocks: (stocks) => set({ stocks }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setResponseCache: (data) => {
    set((state) => ({
      responseHistory: [...state.responseHistory, { ...data, date: new Date() }],
    }));
  },
}));
