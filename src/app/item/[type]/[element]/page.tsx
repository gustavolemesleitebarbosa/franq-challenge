"use client";

import { PriceChart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import { useFinanceStore } from "@/store/financeStore";
import { Currency, Stock } from "@/types/finance";
import { useParams, useRouter } from "next/navigation";

export default function ItemPage() {
  const { type, element } = useParams();
  const router = useRouter();
  const { responseHistory } = useFinanceStore();

  return (
    <div className="flex h-screen w-full flex-col items-stretch justify-between px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full flex-row items-stretch justify-between gap-4 px-8 pt-2">
        <div>
          <span>{type}</span>
          <span>{element}</span>
        </div>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>

      <div className="flex w-full flex-col items-stretch justify-between gap-4 px-8 pb-8">
        <PriceChart
          labels={Object.keys(responseHistory)}
          dataSet1={Object.values(responseHistory).map((item) => {
            const value = item?.results?.[type as keyof typeof item.results]?.[element as string];
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
