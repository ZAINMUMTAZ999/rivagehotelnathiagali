import { useSearchContext } from "../context/SearchContext";
import  { FormEvent, useState } from "react";
import {  Briefcase, Search, RotateCcw } from "lucide-react";

// const industryOptions = [
//   'Tech',
//   'Healthcare', 
//   'Finance',
//   'Education',
//   'Retail',
//   'Marketing',
//   'Hospitality',
//   'Construction',
//   'Entertainment'  
// ];

const SearchHotelsBar = () => {
  const search = useSearchContext();

  const [title, setTitle] = useState(search.title);
//   const [jobLocation, setJobLocation] = useState(search.jobLocation);
//   const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
  const [sortOption, setSortOption] = useState(search.sortOption);
  const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (companysIndustry) {
//       setIsLoading(true);
//       search.saveSearchValues(jobTitle, sortOption);

//       const timer = setTimeout(() => {
//         setIsLoading(false);
//         // Trigger any necessary updates or actions after search
//       }, 1500);

//       return () => clearTimeout(timer);
//     }
//   }, [ title, search , sortOption]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    search.saveSearchValues(title, sortOption);

    setTimeout(() => {
      setIsLoading(false);
      // Trigger any necessary updates or actions after search
    }, 1500);
  };

  const handleReset = () => {
    setTitle('');
    // setJobLocation('');
    // setCompanysIndustry('');
    setSortOption('');
  };

  return (
    <div className="flex justify-center items-center  px-4 mt-5 ">
      <div className="bg-blue-500 p-3 rounded-lg  ">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-white">
              Room Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"  
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search a room Arcadian Resort"
              />
            </div>
          </div>

    

      

          {/* Sort */}
            {/* Sort */}
            <div>
            <label htmlFor="sortOption" className="block text-sm font-medium text-white">
              Sort by  
            </label>
            <select
              id="sortOption"
              name="sortOption" 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Sort by Price</option>
              <option value="salary_Desc"> High to Low</option>
              <option value="salary_Asc"> Low to High</option>
            </select>
          </div>

          {/* Search & Reset Buttons */}
          <div className="md:col-span-4 mt-4  flex justify-between md:mt-0  space-x-">
           
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

export default SearchHotelsBar;
