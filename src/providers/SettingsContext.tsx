"use client";

import React, { createContext, useContext, useState } from "react";

interface SettingsContextType {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <SettingsContext.Provider value={{ isPrivate, setIsPrivate }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
