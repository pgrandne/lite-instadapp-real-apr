"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/types/interface";
import fluidData from "@/data.json";
import { groupByDay } from "@/lib/utils";

const chartConfig = {
  fluid_APR: {
    label: "APR displayed by Fluid",
    color: "var(--chart-1)",
  },
  real_APR: {
    label: "APR calculated (actual)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type ChartProps = {
  readonly profitsAction: Transaction[];
  readonly userDeposit: number;
};

const CustomLabel = ({
  x,
  y,
  value,
}: {
  x: number;
  y: number;
  value: number;
}) => (
  <text x={x} y={y - 8} textAnchor="end" fontSize={11} fill="#666">
    {`${value.toFixed(1)}%`}
  </text>
);

export function ChartAreaInteractive({
  profitsAction,
  userDeposit,
}: ChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const addressData = profitsAction
    .map((tx) => {
      const date = new Date(tx.created_at).toISOString().split("T")[0];

      return {
        date,
        real_APR: userDeposit
          ? ((Number.parseFloat(tx.amount) * 365) / userDeposit) * 100
          : 0,
      };
    })
    .reverse();

  const agregatedFluidData = groupByDay(fluidData).map((fData) => {
    const match = addressData.find((aData) => aData.date === fData.date);
    return {
      ...fData,
      real_APR: match?.real_APR ?? undefined,
    };
  });

  const filteredData = agregatedFluidData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "180d") {
      daysToSubtract = 180;
    } else if (timeRange === "365d") {
      daysToSubtract = 365;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Daily APR (Annual Percentage Rate)</CardTitle>
          <CardDescription>
            Comparing Fluid displayed APR and real APR calculated on distributed
            interest
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="365d" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFluid" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="50%"
                  stopColor="var(--color-fluid_APR)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-fluid_APR)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillReal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-real_APR)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-real_APR)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {addressData.length > 0 && (
              <Area
                dataKey="real_APR"
                type="natural"
                fill="url(#fillReal)"
                stroke="var(--color-real_APR)"
                label={{
                  position: "top",
                  formatter: (value: number) => `${value.toFixed(1)}%`,
                  fontSize: 11,
                  fill: "var(--color-real_APR)",
                }}
              />
            )}
            <Area
              dataKey="fluid_APR"
              type="natural"
              fill="url(#fillFluid)"
              stroke="var(--color-fluid_APR)"
              label={<CustomLabel x={0} y={0} value={0} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
