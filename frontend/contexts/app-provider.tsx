"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

import useIsMobile from "@/hooks/use-is-mobile";

interface IAppContext {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  useLayoutEffect(() => {
    if (!isMobile) {
      setShowSidebar(true);
    }
  }, [isMobile]);

  return (
    <AppContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
