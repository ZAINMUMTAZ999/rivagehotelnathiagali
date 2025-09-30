// import { useSearchContext } from "../context/SearchContext";
// import { FormEvent, useEffect, useState } from "react";
// import { Briefcase, Search, RotateCcw } from "lucide-react";


// const SearchContactBar = () => {
//   const {
//     name: searchName,
//     email: searchEmail,
// phoneNumber: searchphoneNumber,
//     sortOption,

//     saveSearchValues,
//   } = useSearchContext();

//   const [name, setName] = useState(searchName);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [email, setEmail] = useState(searchEmail);
//   const [phoneNumber, setPhoneNumber] = useState(searchphoneNumber);
//   //   const [jobLocation, setJobLocation] = useState(search.jobLocation);
//   //   const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
// //   const [sortOption, setSortOption] = useState(sortBySearch);
//   const [isLoading, setIsLoading] = useState(false);

//   //   useEffect(() => {
//   //     if (companysIndustry) {
//   //       setIsLoading(true);
//   //       search.saveSearchValues(jobTitle, sortOption);

//   //       const timer = setTimeout(() => {
//   //         setIsLoading(false);
//   //         // Trigger any necessary updates or actions after search
//   //       }, 1500);

//   //       return () => clearTimeout(timer);
//   //     }
//   //   }, [ title, search , sortOption]);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     saveSearchValues(name,email,phoneNumber, sortOption); // ✅ pass name
//     setTimeout(() => setIsLoading(false), 1500);
//   };

//   useEffect(() => {
//     setName(name);
//     setPhoneNumber(phoneNumber);
//     // setPhoneNumber(phoneNumber);
//     // setSortOption(sortOption);
//   }, [name,phoneNumber]);

//   const handleReset = () => {
//     setName("");
//     setPhoneNumber("");
//     // setSortOption("");
//     // setJobLocation('');
//     // setCompanysIndustry('');
//   };
// console.log("Submitting:", {
//   name,
//   email,
//   phoneNumber,
//   type: typeof phoneNumber
// });

//   return (
//     <div className="flex justify-center items-center  px-4 mt-5 ">
//       <div className="bg-blue-500 p-3 rounded-lg  ">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4"
//         >
//           {/* Name Search */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-white"
//             >
//                Name Search 
//             </label>
//             <div className="relative mt-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Briefcase className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Search a name of contact"
//               />
//             </div>
//           </div>
//           {/* phoneNumber Search */}
//           <div>
//             <label
//               htmlFor="phoneNumber"
//               className="block text-sm font-medium text-white"
//             >
//                PhoneNumber Search 
//             </label>
//             <div className="relative mt-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Briefcase className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 id="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Search a Number"
//               />
//             </div>
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

// export default SearchContactBar;
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
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOption, setSortOption] = useState(searchSortOption);
//   const [email, setEmail] = useState(searchEmail || "");
  const [phoneNumber, setPhoneNumber] = useState(searchPhoneNumber || ""); // ✅ keep as string
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Always send phoneNumber as string
    saveSearchValues(name, sortOption,phoneNumber?.toString());

    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleReset = () => {
    setName("");
    setPhoneNumber("");
  };

  useEffect(() => {
    setName(searchName || "");
    setPhoneNumber(searchPhoneNumber || "");
  }, [searchName, searchPhoneNumber]);

  console.log("Submitting:", {
    name,
    phoneNumber,
    type: typeof phoneNumber, // ✅ should always be string
  });

  return (
    <div className="flex justify-center items-center px-4 mt-5">
      <div className="bg-blue-500 p-3 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Name Search */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search a name of contact"
              />
            </div>
          </div>

          {/* phoneNumber Search */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-white"
            >
              Phone Number Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} // ✅ always string
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search a Number"
              />
            </div>
          </div>

          {/* Search & Reset Buttons */}
          <div className="md:col-span-4 mt-4 flex justify-between md:mt-0">
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
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default SearchContactBar;
