"use client";

import { Button } from "@/components/ui/button";
import { useIsAuth } from "@/hooks/useIsAuth";
import { account } from "@/lib/appwrite";
import { useFinanceStore } from "@/store/financeStore";
import { CurrencyWithAcronym, StockWithAcronym } from "@/types/finance";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoadingUser } = useIsAuth();
  const { currencies, stocks, error, loading } = useFinanceStore();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className="m-4 flex flex-col gap-8">
      {loading || (isLoadingUser && <p>Carregando dados...</p>)}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && !isLoadingUser && (
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
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{currency.name}</td>
                      <td className="px-4 py-2">{currency.buy?.toFixed(2)}</td>
                      <td className="px-4 py-2">{currency.sell?.toFixed(2)}</td>
                      <td
                        className={`px-4 py-2 ${currency.variation > 0
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
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
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{stock.name}</td>
                      <td className="px-4 py-2">{stock.location ?? "-"}</td>
                      <td className="px-4 py-2">{stock.points ?? "-"}</td>
                      <td
                        className={`px-4 py-2 ${(stock.variation ?? 0) > 0
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {stock.variation ?? 0}%
                      </td>
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
