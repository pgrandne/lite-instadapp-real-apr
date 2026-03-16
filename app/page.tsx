"use client";

import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { SearchInput } from "@/components/SearchInput";
import { Transaction } from "@/types/interface";
import { GithubIcon } from "lucide-react";
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
