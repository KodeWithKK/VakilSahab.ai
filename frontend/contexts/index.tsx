import { ClerkProvider } from "@clerk/nextjs";

import AppProvider from "./app-provider";
import ThemeProvider from "./theme-provider";

function ContextsProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AppProvider>
    </ClerkProvider>
  );
}

export default ContextsProvider;
