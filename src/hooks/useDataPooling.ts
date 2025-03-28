import { useFinanceStore } from "@/store/financeStore";
import {
  type Currency,
  type FinanceAPIResponse,
  type Stock,
} from "@/types/finance";
import { useEffect } from "react";

export function useDataPooling() {
  const { setCurrencies, setStocks, setError, setLoading, setResponseCache } =
    useFinanceStore();

  useEffect(() => {
    async function fetchFinanceData() {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch("/api/finance");
        if (!response.ok) {
          throw new Error(`Falha na requisição: ${response.status}`);
        }

        const data = (await response.json()) as FinanceAPIResponse;
        setResponseCache(data);

        const fetchedCurrencies = data?.results?.currencies ?? {};
        const fetchedStocks = data?.results?.stocks ?? {};

        const currencyEntries: [string, Currency][] =
          Object.entries(fetchedCurrencies);
        const selectedCurrencies = currencyEntries
          ?.slice(1, 6)
          .map(([acronym, currencyInfo]) => ({
            acronym,
            name: `${acronym} (${currencyInfo.name})`,
            buy: currencyInfo.buy,
            sell: currencyInfo.sell,
            variation: currencyInfo.variation,
          }));

        setCurrencies(selectedCurrencies);

        const stockEntries: [string, Stock][] = Object.entries(fetchedStocks);
        const selectedStocks = stockEntries
          ?.slice(0, 5)
          .map(([acronym, stockInfo]) => ({
            acronym,
            name: stockInfo.name,
            location: stockInfo.location,
            points: stockInfo.points,
            variation: stockInfo.variation,
          }));
        setStocks(selectedStocks);
      } catch (err) {
        console.error(err);
        setError(
          "Não foi possível obter os dados de finanças. Tente novamente mais tarde.",
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchFinanceData();

    const intervalId = setInterval(
      () => {
        void fetchFinanceData();
      },
      10 * 60 * 10,
    );

    return () => clearInterval(intervalId);
  }, [setCurrencies, setStocks, setError, setLoading, setResponseCache]);
}
