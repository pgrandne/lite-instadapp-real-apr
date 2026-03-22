"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/interface";
import data from "@/data.json";

export const ExportFluidDailyAPR = () => {
  const handleExport = React.useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Fluid_APR.json";
    link.click();

    URL.revokeObjectURL(url);
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={handleExport}
    >
      <Download className="size-4" />
      Export Fluid daily APR
    </Button>
  );
};

export const ExportDistributedInterest = ({
  profitsAction,
}: {
  profitsAction: Transaction[];
}) => {
  const handleExport = React.useCallback(() => {
    console.log(profitsAction);
    const json = JSON.stringify(profitsAction, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Fluid_distributed_interest.json";
    link.click();

    URL.revokeObjectURL(url);
  }, [profitsAction]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer p-4"
      onClick={handleExport}
    >
      <Download className="size-4" />
      <span className="flex flex-col">
        <span className="">Export Distributed interest</span>
        <span className="">for this adress</span>
      </span>
    </Button>
  );
};
