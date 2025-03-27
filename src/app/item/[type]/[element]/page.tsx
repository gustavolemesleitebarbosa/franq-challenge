"use client";

import { PriceChart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import { useFinanceStore } from "@/store/financeStore";
import { type Currency, type Stock } from "@/types/finance";
import { useParams, useRouter } from "next/navigation";

export default function ItemPage() {
  const { type, element } = useParams();
  const router = useRouter();
  const { responseHistory } = useFinanceStore();
  return (
    <div className="flex h-screen w-full flex-col items-stretch justify-between px-2 font-[family-name:var(--font-geist-sans)]">
      <div className="mt-2 flex w-full flex-row items-stretch justify-end gap-4 px-2 pt-2 md:px-8">
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>

      <div className="mb-4 flex h-full w-full flex-col items-stretch justify-between gap-4 px-2 pb-6 md:px-8">
        <PriceChart
          labels={Object.values(responseHistory).map((item) =>
            new Date(item.date).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          )}
          title={
            type === "stocks"
              ? `Ações: ${element as string}`
              : `Moeda: ${element as string} `
          }
          legendTitle={type === "stocks" ? "Pontos" : "Valor de Compra"}
          dataSet1={Object.values(responseHistory).map((item) => {
            const value =
              item?.results?.[type as keyof typeof item.results]?.[
                element as string
              ];
            if (type === "stocks") {
              return (value as Stock)?.points;
            }
            return (value as Currency)?.buy;
          })}
        />
      </div>
    </div>
  );
}
