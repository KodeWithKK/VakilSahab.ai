"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function DynamicTheme({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (pathname === "/") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [pathname]);

  return <>{children}</>;
}

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <DynamicTheme>{children}</DynamicTheme>
    </NextThemesProvider>
  );
}
