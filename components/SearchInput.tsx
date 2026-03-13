"use client";

import { useState } from "react";
import { Transaction } from "@/types/interface";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type SearchInputProps = {
  readonly setProfitsAction: React.Dispatch<
    React.SetStateAction<Transaction[]>
  >;
  readonly setUserDeposit: React.Dispatch<React.SetStateAction<number>>;
};

export function SearchInput({
  setProfitsAction,
  setUserDeposit,
}: SearchInputProps) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (wallet: string) => {
    try {
      setLoading(true);

      const now = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);

      const res1 = await fetch(
        `https://api.instadapp.io/v2/mainnet/lite/users/${wallet}/vaults`,
      );

      if (!res1.ok) throw new Error("API error");

      const userData = await res1.json();
      const deposit = Number.parseFloat(userData[0].userSupplyAmount);

      setUserDeposit(deposit);

      const params = new URLSearchParams({
        "types[]": "profit",
        from_date: oneYearAgo.toISOString(),
        to_date: now.toISOString(),
        user_address: wallet,
        per_page: "365",
        page: "1",
      });

      const res2 = await fetch(
        `https://lite.api.instadapp.io/mainnet/transaction-actions?${params}`,
      );

      if (!res2.ok) throw new Error("API error");

      const result = await res2.json();

      setProfitsAction(result.data ?? []);
    } catch (err) {
      console.error(err);
      setProfitsAction([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!address.trim()) return;
    fetchTransactions(address);
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Input
        className="w-96"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <Button
        onClick={handleSearch}
        disabled={loading}
        variant="outline"
        className="cursor-pointer"
      >
        {loading && <Spinner />}
        {loading ? "Loading..." : "Search"}
      </Button>
    </div>
  );
}
