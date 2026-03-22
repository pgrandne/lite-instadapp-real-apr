"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";

export const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex items-center justify-end space-x-2">
        <Moon size={20} />
        <Switch
          id="theme-mode"
          className="cursor-pointer"
          checked={mounted ? resolvedTheme === "dark" : false}
          onCheckedChange={(checked) => {
            setTheme(checked ? "dark" : "light");
          }}
        />
        <Sun size={20} />
      </div>
      <h1 className="text-center text-2xl font-bold p-2">
        Compare your
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              className="text-2xl font-extrabold cursor-pointer"
            >
              actual APR
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-0.5">
            <div>
              The actual APR is calcualted from daily distributed interest of
              Fluid
            </div>
          </HoverCardContent>
        </HoverCard>
        with Fluid’s displayed APR
      </h1>
    </div>
  );
};
