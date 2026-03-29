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
  readonly setEthValue: React.Dispatch<React.SetStateAction<number>>;
};

export function SearchInput({
  setProfitsAction,
  setUserDeposit,
  setEthValue,
}: SearchInputProps) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (wallet: string) => {
    try {
      setLoading(true);

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });

      if (!res.ok) throw new Error("API error");

      const result = await res.json();

      setUserDeposit(Number(result?.deposit ?? 0));
      setProfitsAction(result?.transactions ?? []);
      setEthValue(result?.ethUsd ?? 0);
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
