"use client";

import { Button } from "@/components/ui/button";
import { useIsAuth } from "@/hooks/useIsAuth";
import { account } from "@/lib/appwrite";
import { useFinanceStore } from "@/store/financeStore";
import {
  type CurrencyWithAcronym,
  type StockWithAcronym,
} from "@/types/finance";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoadingUser } = useIsAuth();
  const { currencies, stocks, error } = useFinanceStore();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      router.push("/login");
    }
  };

  const handleStockSelection = (stock: StockWithAcronym) => {
    router.push(`/item/stocks/${stock.acronym}`);
  };

  const handleCurrencySelection = (currency: CurrencyWithAcronym) => {
    router.push(`/item/currencies/${currency.acronym}`);
  };

  return (
    <div className="m-4 flex flex-col gap-8">
      {isLoadingUser && <p>Carregando dados...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!error && !isLoadingUser && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
            <Button onClick={handleLogout}>Sair</Button>
          </div>
          <section className="text-xs md:text-base">
            <h2 className="mb-4 px-2 text-base font-semibold text-gray-800 md:text-2xl">
              Moedas
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="w-1/4 px-4 py-2 text-left">Nome</th>
                    <th className="w-1/4 px-4 py-2 text-left">Compra</th>
                    <th className="w-1/4 px-4 py-2 text-left">Venda</th>
                    <th className="w-1/4 px-4 py-2 text-left">Variação (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((currency, index) => (
                    <tr
                      onClick={() => handleCurrencySelection(currency)}
                      key={index}
                      className={`border-b hover:cursor-pointer ${currency.variation > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      <td className="px-4 py-2">{currency.name}</td>
                      <td className="px-4 py-2">
                        {currency.buy?.toFixed(5) ?? "-"}
                      </td>
                      <td className="px-4 py-2">
                        {currency.sell?.toFixed(5) ?? "-"}
                      </td>
                      <td className={"px-4 py-2"}>
                        {currency.variation || 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="text-xs md:text-base">
            <h2 className="mb-4 px-2 text-base font-semibold text-gray-800 md:text-2xl">
              Ações / Índices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="w-1/4 px-4 py-2 text-left">Nome</th>
                    <th className="w-1/4 px-4 py-2 text-left">Local</th>
                    <th className="w-1/4 px-4 py-2 text-left">Pontos</th>
                    <th className="w-1/4 px-4 py-2 text-left">Variação (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, index) => (
                    <tr
                      onClick={() => handleStockSelection(stock)}
                      key={index}
                      className={`border-b hover:cursor-pointer ${stock.variation > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      <td className="px-4 py-2">{stock.name}</td>
                      <td className="px-4 py-2">{stock.location ?? "-"}</td>
                      <td className="px-4 py-2">{stock.points ?? "-"}</td>
                      <td className={"px-4 py-2"}>{stock.variation ?? 0}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
