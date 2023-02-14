import { createContext, ReactNode, useState } from "react";

type LoginContextType = {};

export const LoginContext = createContext({} as LoginContextType);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};
