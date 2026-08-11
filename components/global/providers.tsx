"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/global/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster>{children}</Toaster>
      </TooltipProvider>
    </ThemeProvider>
  );
}
