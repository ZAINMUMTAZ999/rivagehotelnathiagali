"use client";
import React, { useContext, useState } from "react";

type searchContext = {
  name: string;
  email: string;
  phoneNumber: string;
  // name: string;
  sortOption: string; // Make sure this matches what you use in components
  saveSearchValues: (
    name: string,
    email: string,
    // name: string,
    phoneNumber: string,

    sortOption: string // This parameter name should match what you pass
  ) => void;
};

const searchContext = React.createContext<searchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [phoneNumber, setphoneNumber] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [phoneNumber, setphoneNumber] = useState<string>("");

  // const [title, setTitle] = useState<string>("");
  // const [jobLocation, setJobLocation] = useState<string>("");
  // const [companysIndustry, setCompanysIndustry] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const saveSearchValues = (
    phoneNumber: string,
    // name: string,
    name: string,
    sortOption: string
  ) => {
    setphoneNumber(phoneNumber);
    // setname(name);
    setname(name);
    setemail(email);
    setSortOption(sortOption);
    // sessionStorage.setItem("phoneNumber",phoneNumber)
    // sessionStorage.setItem("name",name)
  };

  return (
    <searchContext.Provider
      value={{
        phoneNumber,
        email,
        sortOption,
        name,
        saveSearchValues,
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
