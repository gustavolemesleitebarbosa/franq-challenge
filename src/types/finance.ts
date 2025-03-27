// src/types/finance.ts
export type FinanceAPIResponse = {
  results: {
    currencies: Record<string, Currency>;
    stocks: Record<string, Stock>;
  };
};

export type Currency = {
  name: string;
  buy: number;
  sell: number;
  variation: number;
};

export type Stock = {
  name: string;
  location: string;
  points: number;
  variation: number;
};

export type CurrencyWithAcronym = Currency & { acronym: string };
export type StockWithAcronym = Stock & { acronym: string };
