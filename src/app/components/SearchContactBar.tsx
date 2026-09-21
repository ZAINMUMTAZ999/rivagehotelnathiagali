"use client";

import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useEffect, useState } from "react";
import { Briefcase, Search, RotateCcw } from "lucide-react";

const SearchContactBar = () => {
  const {
    name: searchName,
    sortOption: searchSortOption,
    phoneNumber: searchPhoneNumber,
    saveSearchValues,
  } = useSearchContext();

  const [name, setName] = useState(searchName || "");
  const [sortOption, setSortOption] = useState(searchSortOption || "");
  const [phoneNumber, setPhoneNumber] = useState(searchPhoneNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(searchName || "");
    setPhoneNumber(searchPhoneNumber || "");
    setSortOption(searchSortOption || "");
  }, [searchName, searchPhoneNumber, searchSortOption]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    saveSearchValues(name, phoneNumber, sortOption);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setName("");
    setPhoneNumber("");
    setSortOption("");

    saveSearchValues("", "", "");
  };

  return (
    <div className="w-full flex justify-center items-center mt-4 sm:mt-5">
      <div className="w-full bg-blue-900 p-3 sm:p-4 md:p-5 rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {/* Name Search */}
          <div className="w-full min-w-0">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Name Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full min-w-0 pl-10 pr-3 py-2.5 sm:py-3 md:py-2.5 border border-gray-300 rounded-md bg-white text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search a name"
              />
            </div>
          </div>

          {/* Phone Number Search */}
          <div className="w-full min-w-0">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Phone Number Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full min-w-0 pl-10 pr-3 py-2.5 sm:py-3 md:py-2.5 border border-gray-300 rounded-md bg-white text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search a number"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            {/* Search */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:w-auto min-w-[130px] px-5 py-2.5 sm:py-3 md:py-2.5 text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-slate-500 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>Search</span>
                </>
              )}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center w-full sm:w-auto min-w-[130px] px-5 py-2.5 sm:py-3 md:py-2.5 text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-slate-500 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchContactBar;