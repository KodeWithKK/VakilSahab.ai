"use client";

import { createContext, useContext } from "react";

interface IAppContext {}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
}

export default AppProvider;
