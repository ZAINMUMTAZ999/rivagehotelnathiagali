"use client";
  import React, { useContext, useState } from "react";

  type searchContext = {
    phoneNumber: string;
    name: string;
    saveSearchValues: (
      phoneNumber: string,
      name: string,
    ) => void;
  };
  
  const searchContext = React.createContext<searchContext | undefined>(undefined);
  
  export const SearchContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [phoneNumber, setphoneNumber] = useState<string>("");
    const [name, setname] = useState<string>("");
  
    const saveSearchValues = (
      phoneNumber: string,
      name: string,
      
    ) => {
      setphoneNumber(phoneNumber);
      setname(name);
      // sessionStorage.setItem("phoneNumber",phoneNumber)
      sessionStorage.setItem("name",name)
    
    };
  
    return (
      <searchContext.Provider
        value={{
          phoneNumber,
          name,
          saveSearchValues
        }}
      >
        {children}
      </searchContext.Provider>
    );
  };
  
  export const useSearchContext = () => {
    const context = useContext(searchContext);
    return context as searchContext;
  };