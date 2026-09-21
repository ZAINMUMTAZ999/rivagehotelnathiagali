"use client";

import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useState } from "react";
import { Briefcase, Search, RotateCcw } from "lucide-react";

const SearchHotelsBar = () => {
  const {
    name: searchName,
    sortOption: searchSortOption,
    saveSearchValues,
    phoneNumber,
  } = useSearchContext();

  const [name, setName] = useState(searchName);
  const [sortOption, setSortOption] = useState(searchSortOption);
  const [isLoading, setIsLoading] = useState(false);

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
    setSortOption("");

    saveSearchValues("", phoneNumber, "");
  };

  return (
    <div className="w-full flex justify-center items-center px-0 sm:px-2 mt-4 sm:mt-5">
      
      <div className="w-full bg-blue-900 p-4 sm:p-5 rounded-xl shadow-md">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >

          {/* Room Name */}
          <div className="w-full">

            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Room Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                id="roomName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="Search a room e.g. Arcadian Resort"
              />
            </div>

          </div>

          {/* Sort Option */}
          <div className="w-full">

            <label
              htmlFor="sortOption"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Sort by
            </label>

            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full bg-white pl-3 pr-10 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:cursor-pointer"
            >
              <option value="">Sort by Price</option>
              <option value="priceDesc">High to Low</option>
              <option value="priceAsc">Low to High</option>
            </select>

          </div>

          {/* Buttons */}
          <div className="w-full md:col-span-1 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-3 sm:items-center md:items-stretch lg:items-center self-end">

            {/* Search */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:flex-1 md:w-full lg:flex-1 py-2.5 sm:py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-slate-500 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
              className="inline-flex items-center justify-center w-full sm:flex-1 md:w-full lg:flex-1 py-2.5 sm:py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-slate-500 active:scale-95 transition-all duration-200 cursor-pointer"
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

export default SearchHotelsBar;