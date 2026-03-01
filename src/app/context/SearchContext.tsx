"use client";
import React, { useContext, useState } from "react";

type SearchContextType = {
  name: string;
  phoneNumber: string;
  sortOption: string;
  saveSearchValues: (name: string, phoneNumber: string, sortOption: string) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const saveSearchValues = (name: string, phoneNumber: string, sortOption: string) => {
    setName(name);
    setPhoneNumber(phoneNumber);
    setSortOption(sortOption);
  };

  return (
    <SearchContext.Provider
      value={{
        name,
        phoneNumber,
        sortOption,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchContext must be used inside SearchContextProvider");
  return context;
};
