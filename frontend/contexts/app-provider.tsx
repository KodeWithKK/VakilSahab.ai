"use client";

import { createContext, useContext, useState } from "react";

interface IAppContext {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <AppContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
