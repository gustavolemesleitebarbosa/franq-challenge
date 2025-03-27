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
    set((state) =>
      // If the responseHistory has more than 100 items, keep only every other response (roughly halving the list) so it doesn't grow indefinitely

      state.responseHistory.length >= 100
        ? {
            responseHistory: [
              ...state.responseHistory.filter((_, index) => index % 2 === 0),
              { ...data, date: new Date() },
            ],
          }
        : {
            responseHistory: [
              ...state.responseHistory,
              { ...data, date: new Date() },
            ],
          },
    );
  },
}));
