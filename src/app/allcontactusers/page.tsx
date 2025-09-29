"use client"
 import { useQuery } from "@tanstack/react-query";
import {  contactUsTypes, searchPageContact } from "../Api";
import { useState } from "react";

import Pagination from "../components/Pagination";
import SearchBar from "../components/searchbar";
import { useSearchContext } from "../context/SearchContext";

  // const queryKey = ["searchPageContact", searchParams.jobTitle, searchParams.companysIndustry, 
  //                  searchParams.jobLocation, 
  //                  searchParams.sortOption, 
  //                  searchParams.page];

export default function GetContactUs  () {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
const searchParams = {
  phoneNumber: search.phoneNumber.toString(),
  name: search.name,
  page: page.toString(),
};

// include anything that affects the result inside the queryKey array
const queryKey = ["searchPageContact",  searchParams.page,search.name,search.phoneNumber];

const {
  data,
  isLoading,
  error,
} = useQuery({
  queryKey,                                   // ✅ array from above
  queryFn: () => searchPageContact(searchParams), // ✅ function returning a promise
  
});

  
  console.log("allContactUsList", data?.data);
  const fetchAllContact = data?.data;


  if (isLoading) return "loading..";
    // return <BlogSkeleton/>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Failed to load all contacts.</div>
    );


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Contacts list</h1>
      <SearchBar/>
       {
          data?.pagination.total ===0 ?   <span className="font-bold  flex justify-end mr-96">
          {data?.pagination?.total} contact Found
        </span>:
     
        <span className="font-bold  flex justify-end mr-96">
          {data?.pagination?.total} contact Found
        </span>
    
        }
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {fetchAllContact?.map((blog:contactUsTypes) => (
    <div
      key={blog._id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-1 space-y-2">
        <div>
          <span className="font-bold underline text-gray-800">Name:</span>{" "}
          <span className="text-gray-700 font-normal">{blog?.name}</span>
        </div>
        <div>
          <span className="font-bold underline text-gray-800">Email:</span>{" "}
          <span className="text-gray-700 font-normal">{blog?.email}</span>
        </div>
        <div>
          <span className="font-bold underline text-gray-800">Phone Number:</span>{" "}
          <span className="text-gray-700 font-normal">{blog?.phoneNumber}</span>
        </div>
      
        <div>
          <span className="font-bold underline text-gray-800">Message:</span>{" "}
          <span className="text-gray-700 font-normal">{blog?.message}</span>
        </div>
      </div>
    </div>
  ))}
</div>

           <Pagination
  page={data?.pagination?.page || 1}
  pages={data?.pagination?.pages || 1}
  onPageChange={(page) => setPage(page)}
/>

    </div>
  );
};

