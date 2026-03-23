"use client";

import { AverageTable } from "@/components/AverageTable";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import {
  ExportDistributedInterest,
  ExportFluidDailyAPR,
} from "@/components/ExportFluid";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";
import { Transaction } from "@/types/interface";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [profitsAction, setProfitsAction] = useState<Transaction[]>([]);
  const [userDeposit, setUserDeposit] = useState(0);

  return (
    <div className="flex min-h-screen w-full flex-col p-6">
      <Header />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-14">
        <SearchInput
          setProfitsAction={setProfitsAction}
          setUserDeposit={setUserDeposit}
        />
        <ChartAreaInteractive
          profitsAction={profitsAction}
          userDeposit={userDeposit}
        />
        <div className="flex w-full items-center justify-evenly">
          <div className="w-full max-w-130">
            <AverageTable
              profitsAction={profitsAction}
              userDeposit={userDeposit}
            />
          </div>
          <div className="w-full max-w-65">
            <div className="flex flex-col space-y-4">
              <ExportFluidDailyAPR />
              {profitsAction.length > 0 && (
                <ExportDistributedInterest profitsAction={profitsAction} />
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <a
          href="https://github.com/pgrandne/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <span>·</span>

        <a
          href="https://perrin.website/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          My site
        </a>
      </footer>
    </div>
  );
}
