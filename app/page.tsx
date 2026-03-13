"use client";

import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { SearchInput } from "@/components/SearchInput";
import { Transaction } from "@/types/interface";
import { useState } from "react";

export default function Page() {
  const [profitsAction, setProfitsAction] = useState<Transaction[]>([]);
  const [userDeposit, setUserDeposit] = useState(0);

  return (
    <div className="w-screen h-screen p-6">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <SearchInput
          setProfitsAction={setProfitsAction}
          setUserDeposit={setUserDeposit}
        />
        <ChartAreaInteractive
          profitsAction={profitsAction}
          userDeposit={userDeposit}
        />
      </div>
    </div>
  );
}
