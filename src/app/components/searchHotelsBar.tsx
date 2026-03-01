// import { useSearchContext } from "../context/SearchContext";
// import { FormEvent, useEffect, useState } from "react";
// import { Briefcase, Search, RotateCcw } from "lucide-react";

// const SearchHotelsBar = () => {
//   const {
//     name: searchName,
//     phoneNumber: searchphoneNumber,
//     sortOption: sortBySearch,
//     saveSearchValues,
//   } = useSearchContext();

//   const [name, setName] = useState(searchName);
//   const [phoneNumber, setphoneNumber] = useState(searchphoneNumber);
//   const [sortOption, setSortOption] = useState(sortBySearch);
//   const [isLoading, setIsLoading] = useState(false);


//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     saveSearchValues(name,phoneNumber, sortOption); // ✅ pass name
//     setTimeout(() => setIsLoading(false), 1500);
//   };

//   useEffect(() => {
//     setName(name);
//     setphoneNumber(phoneNumber);
//     setSortOption(sortOption);
//   }, [name, phoneNumber,sortOption]);

//   const handleReset = () => {
//     setName("");
//     setSortOption("");
 
//   };

//   return (
//     <div className="flex justify-center items-center  px-4 mt-5 ">
//       <div className="bg-blue-500 p-3 rounded-lg  ">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4"
//         >
//           {/* Job Title */}
//           <div>
//             <label
//               htmlFor="jobTitle"
//               className="block text-sm font-medium text-white"
//             >
//               Room Search
//             </label>
//             <div className="relative mt-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Briefcase className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Search a room Arcadian Resort"
//               />
//             </div>
//           </div>
//           {/* Sort */}
//           <div>
//             <label
//               htmlFor="sortOption"
//               className="block text-sm font-medium text-white"
//             >
//               Sort by
//             </label>
//             <select
//               id="sortOption"
//               name="sortOption"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-base border-gray-300
//              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
//              sm:text-sm rounded-md"
//             >
//               <option value="">Sort by Price</option>
//               <option value="priceDesc">High to Low</option>
//               <option value="priceAsc">Low to High</option>
//             </select>
//           </div>

//           {/* Search & Reset Buttons */}
//           <div className="md:col-span-4 mt-4  flex justify-between md:mt-0  space-x-">
//             <button
//               type="submit"
//               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
//                   Searching...
//                 </div>
//               ) : (
//                 <>
//                   <Search className="mr-2 h-4 w-4" />
//                   Search
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={handleReset}
//               className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <RotateCcw className="mr-2 h-4 w-4" />
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SearchHotelsBar;
"use client";
import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useState } from "react";
import { Briefcase, Search, RotateCcw } from "lucide-react";

const SearchHotelsBar = () => {
  const {
    name: searchName,
    sortOption: searchSortOption,
    saveSearchValues,
    phoneNumber, // 👈 still available globally but unused here
  } = useSearchContext();

  const [name, setName] = useState(searchName);
  const [sortOption, setSortOption] = useState(searchSortOption);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pass along phoneNumber unchanged so context stays consistent
    saveSearchValues(name, phoneNumber, sortOption);

    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleReset = () => {
    setName("");
    setSortOption("");
    saveSearchValues("", phoneNumber, ""); // keep phoneNumber intact
  };

  return (
    <div className="flex justify-center items-center px-4 mt-5">
      <div className="bg-blue-500 p-3 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Room Name */}
          <div>
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-white"
            >
              Room Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="roomName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search a room e.g. Arcadian Resort"
              />
            </div>
          </div>

          {/* Sort Option */}
          <div>
            <label
              htmlFor="sortOption"
              className="block text-sm font-medium text-white"
            >
              Sort by
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-base border-gray-300
             focus:outline-none focus:ring-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Sort by Price</option>
              <option value="priceDesc">High to Low</option>
              <option value="priceAsc">Low to High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-1 mt-4 flex justify-between">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center items-center py-2 px-4 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchHotelsBar;
