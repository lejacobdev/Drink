"use client";

import { createContext, useCallback, useContext, useState } from "react";
import RetailerSheet from "./RetailerSheet";

type RetailerContextValue = {
  open: () => void;
  close: () => void;
};

const RetailerContext = createContext<RetailerContextValue | null>(null);

export function useRetailerSheet(): RetailerContextValue {
  const ctx = useContext(RetailerContext);
  if (!ctx) throw new Error("useRetailerSheet außerhalb des RetailerProvider");
  return ctx;
}

export function RetailerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <RetailerContext.Provider value={{ open, close }}>
      {children}
      {isOpen && <RetailerSheet onClose={close} />}
    </RetailerContext.Provider>
  );
}
