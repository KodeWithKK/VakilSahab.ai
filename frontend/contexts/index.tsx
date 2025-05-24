"use client";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

import AppProvider from "./app-provider";
import ReactQueryProvider from "./react-query-provider";
import ThemeProvider from "./theme-provider";

function ContextsProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </AppProvider>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}

export default ContextsProvider;
