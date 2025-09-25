"use client";
import { useSearchContext } from "../context/SearchContext";
import  { FormEvent,  useState } from "react";
import {  Search, PhoneIcon, RotateCcw } from "lucide-react";
import { CgNametag } from "react-icons/cg";



const SearchBar = () => {
  const search = useSearchContext();

//   const [transactionId, setTransactionsId] = useState(search.transactionId);
  // const [phoneNumber, setPhoneNumber] = useState(search.phoneNumber);
  const [name, setname] = useState(search.name);
  const [phoneNumber, setphoneNumber] = useState(search.phoneNumber);
//   const [jobLocation, setJobLocation] = useState(search.jobLocation);
//   const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
//   const [sortOption, setSortOption] = useState(search.sortOption);
  const [isLoading, setIsLoading] = useState(false);


  // useEffect(() => {
  //   if (name) {
  //     setIsLoading(true);
  //     search.saveSearchValues(name,phoneNumber);

  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //       // Trigger any necessary updates or actions after search
  //     }, 1500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [name, phoneNumber, search]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    // search.saveSearchValues(phoneNumber);
    search.saveSearchValues(name,phoneNumber);

    setTimeout(() => {
      setIsLoading(false);
      // Trigger any necessary updates or actions after search
    }, 1500);
  };

  const handleReset = () => {
    setname('');
    setphoneNumber('');
    // setCompanysIndustry('');
    // setSortOption('');
  };

  return (
    <div className="flex justify-center items-center w-full px-4 py-6">
      <div className="bg-gray-300 p-6 rounded-lg w-full max-w-6xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
         
         

          {/* Job Location */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
              Phonenumber
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-gray-400" />  
              </div>
              <input  
                 type="number"
                name="phoneNumber" 
                id="phoneNumber"
                
                value={phoneNumber}
            
                onChange={(e) => setphoneNumber(e.target.value)}

                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="search by phoneNumber"
              />
            </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CgNametag className="h-5 w-5 text-gray-400" />  
              </div>
              <input  
                 type="text"
                name="name" 
                id="name"
                
                value={name}
            
                onChange={(e) => setname(e.target.value)}

                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="search by name"
              />
            </div>
          </div>
          </div>


          {/* Search Buttons */}
     <div className="md:col-span-4 mt-4 md:mt-0 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}  
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" /> 
                  Searching...
                </div>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" /> 
                  Search
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
