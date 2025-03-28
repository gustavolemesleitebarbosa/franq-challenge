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
import { BounceLoader } from "react-spinners";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useIsAuth(true);
  const { currencies, stocks, error } = useFinanceStore();

  let userName = "";
  if (typeof window !== "undefined") {
    userName = localStorage.getItem("name") ?? "";
  }

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
      router.push("/login");
    }
  };

  const handleStockSelection = (stock: StockWithAcronym) => {
    router.push(`/item/stocks/${stock.acronym}`);
  };

  const handleCurrencySelection = (currency: CurrencyWithAcronym) => {
    router.push(`/item/currencies/${currency.acronym}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="mb-4">Carregando dados do usuário...</div>
        <BounceLoader />
      </div>
    );
  }

  return (
    <div className="m-4 flex flex-col gap-8">
      <div className="flex h-full w-full flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {!error && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-base font-bold md:text-2xl">{`Olá ${userName}, Bem vindo ao Dashboard Financeiro`}</h1>
            </div>
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
                      className={`border-b hover:cursor-pointer ${
                        currency.variation > 0
                          ? "text-green-600"
                          : "text-red-600"
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
                      className={`border-b hover:cursor-pointer ${
                        stock.variation > 0 ? "text-green-600" : "text-red-600"
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
