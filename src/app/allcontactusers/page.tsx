"use client";
import {  searchPageContact } from "../Api";
import { AppContext } from "../context/AppNotify";
import { useQuery } from "@tanstack/react-query";
import { Users, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
// import SearchHotelsBar from "../components/searchHotelsBar";
import SearchContactBar from "../components/SearchContactBar";


// Main skeleton component for the dashboard
const DashboardSkeleton = () => (
    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 animate-pulse">
      {/* <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div> */}
      Loading....

    </div>

);

const GetAllContacts = () => {
    const [page, setPage] = useState<number>(1);
    const { isAdmin } = AppContext();
    const search = useSearchContext();
    const searchParams = {
  name: search.name,        // ✅ correct key
  phoneNumber: search.phoneNumber,        // ✅ correct key
  // email: search.,        // ✅ correct key
  // phoneNumber: search.,        // ✅ correct key
  // sortOption: search.sortOption,
  page: page.toString(),
};

      const queryKey = ["searchContacts",
         searchParams.name, 
         searchParams.phoneNumber, 
        //  searchParams.p, 
    //  searchParams.companysIndustry, 
                  //  searchParams.jobLocation, 
                  //  searchParams.sortOption, 
                   searchParams.page];
    // const { 
    //     data: totalUsers, 
    //     isLoading: usersLengthLoading, 
    //     error: usersError 
    // } = useQuery("totalUser", getcon);
    
      const { data: totalUsers, isLoading:usersLengthLoading,  error: usersError  } = useQuery({
  queryKey: queryKey, // include params so cache updates when they change
  queryFn: () => searchPageContact(searchParams),
  //  {
  //     staleTime: Infinity, // Never consider the data stale
  //     cacheTime: Infinity, // Keep the data in cache indefinitely
  //     refetchOnMount: false, // Don't refetch when component mounts again
  //     refetchOnWindowFocus: false, // Don't refetch when window regains focus
  //     refetchOnReconnect: false, // Don't refetch when reconnecting
  //   }
});
    // const searchParamss = {
    //     transactionId: search.name,
    //     // phoneNumber: search.,
    //     page: page.toString(),
    // };
    
    // const { data: depositData, isLoading: depositDataLoading, error: depositError } = useQuery(
    //     ["searchDeposits", searchParamss], 
    //     () => getDepositDataDashboardApi(searchParamss),
    //     { keepPreviousData: true }
    // );
    
    // console.log(depositData)
    
    // Loading states - use skeleton instead of simple loader
    if (usersLengthLoading ) {
        return <DashboardSkeleton />;
    }

    // Error states
    if (usersError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Error Loading Data
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {usersError ? "Failed to load user data" : "Failed to load deposit data"}
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // No users state
    if (!totalUsers) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        No Contacted Users
                    </h2>
                    <p className="text-gray-600">
                        There are no contacted users in the system yet.
                    </p>
                </div>
            </div>
        );
    }

    // Admin access check
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-600">
                        You don&apos;t have permission to view this dashboard.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                View All Contacts
                            </h1>
                          
                        </div>
                        {/* <CreditCard className="w-8 h-8 text-blue-600" /> */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
              {/* <span className="mb-4"> */}

                <SearchContactBar />
              {/* </span> */}

                {/* Deposits Section */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        {/* <h2 className="text-lg font-semibold text-gray-800">
                            Recent Deposits
                        </h2> */}
                        {/* <p className="text-gray-600 text-sm mt-1">
                            {depositData?.data.length || 0} deposits found
                        </p> */}
                    </div>
                    {/* <span className="text-5xl font-extrabold underline tracking-wider  flex justify-center items-center">
                        Deposits List
                    </span> */}
                    <div className="p-6">
                        {!totalUsers || totalUsers.data.length === 0 ? (
                            <div className="text-center py-12">
                                {/* <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No Contact Found
                                </h3>
                                {/* href="/allcontactusers" */}
                                  <button
          
       onClick={() =>window.location.href = '/allcontactusers'}
      className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium justify-center items-center text-center
                 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-blue-400"
    >
      GoBack
    </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {totalUsers?.data.map((deposit) => {
                                    const {  phoneNumber,email,name,message,_id } = deposit;
                                    
                                    return (
                                        <div 
                                            key={_id} 
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                        >
                                            {/* <div className="mb-4">
                                                <h3 className="text-sm font-bold text-gray-700 mb-1">
                                                    PhoneNumber : 
                                                <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                                                     {phoneNumber}
                                                </span>
                                                </h3>
                                            </div> */}
                                            <div className="mb-4">
                                                <h3 className="text-sm font-bold text-gray-700 mb-1">
                                                    PhoneNumber : 
                                                <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                                                     {phoneNumber}
                                                </span>
                                                </h3>
                                            </div>
                                            <div className="mb-4">
                                                <h3 className="text-sm font-bold text-gray-700 mb-1">
                                                    email : 
                                                <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                                                     {email}
                                                </span>
                                                </h3>
                                            </div>
                                            <div className="mb-4">
                                                <h3 className="text-sm font-bold text-gray-700 mb-1">
                                                    name : 
                                                <span  className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                                                     {name}
                                                </span>
                                                </h3>
                                            </div>
                                            <div className="mb-4">
                                                <h3 className="text-sm font-bold text-gray-700 mb-1">
                                                    message : 
                                                <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                                                     {message}
                                                </span>
                                                </h3>
                                            </div>

                                            {/* {imageFile && (
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-bold text-gray-700 mb-2">
                                                        Payment ScreenShot
                                                    </h4>
                                                    <div className="relative overflow-hidden rounded-md border">
                                                        <a 
                                                            href={imageFile} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img 
                                                                src={imageFile} 
                                                                alt={`Receipt for transaction ${transactionId}`}
                                                                className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                                                onClick={() => {
                                                                    window.location.href = imageFile;
                                                                }}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            )} */}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div> 
            </div>
            
            <div className="mt-8">
                <Pagination
                    page={totalUsers?.pagination?.page || 1}
                    pages={totalUsers?.pagination?.pages || 1}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );
};

export default GetAllContacts;
// import { AppContext } from "@/context/AppNotify";
// import { useQuery } from "react-query";
// import { Users, CreditCard, AlertCircle, Loader2 } from "lucide-react";
// import Pagination from "../Pagination";
// import { useState } from "react";
// import { useSearchContext } from "@/context/SearchContext";
// import SearchBar from "../SearchBar";


// const GetDeposit = () => {

//     const [page, setPage] = useState<number>(1);
//     const { isAdmin } = AppContext();
//       const search = useSearchContext();
    
//     const { 
//         data: totalUsers, 
//         isLoading: usersLengthLoading, 
//         error: usersError 
//     } = useQuery("totalUser", getTotalUsersDashboardApi);
    
//     // const { 
//     //     data: depositData, 
//     //     isLoading: depositDataLoading, 
//     //     error: : 
//     // } = useQuery("depositData", getDepositDataDashboardApi); 
//         const searchParamss = {
// //   transactionId?: string;
// //   page?: string;
//    transactionId: search.transactionId,
//     page: page.toString(),
// };
//   // *** OPTIMIZATION: Only one query is needed to fetch and display blogs ***
//   const { data: depositData, isLoading:depositDataLoading, error:depositError } = useQuery(
//     ["searchDeposits",searchParamss], 
//     () => getDepositDataDashboardApi(
// searchParamss),
//     { keepPreviousData: true } // Improves user experience on pagination
//   );
// console.log(depositData)
//     // Loading states
//     if (usersLengthLoading || depositDataLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="text-center">
//                     <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                         Loading Dashboard Data
//                     </h2>
//                     <p className="text-gray-600">
//                         {usersLengthLoading ? "Loading user statistics..." : "Loading deposit data..."}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // Error states
//     if (usersError || depositError) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
//                     <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                         Error Loading Data
//                     </h2>
//                     <p className="text-gray-600 mb-4">
//                         {usersError ? "Failed to load user data" : "Failed to load deposit data"}
//                     </p>
//                     <button 
//                         onClick={() => window.location.reload()} 
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // No users state
//     if (!totalUsers || totalUsers === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
//                     <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                         No Registered Users
//                     </h2>
//                     <p className="text-gray-600">
//                         There are no registered users in the system yet.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // Admin access check
//     if (!isAdmin) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
//                     <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                         Access Denied
//                     </h2>
//                     <p className="text-gray-600">
//                         You don't have permission to view this dashboard.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-purple-900">
//             {/* Header */}
//             <div className="bg-white shadow-sm border-b">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                                 Deposit Dashboard
//                             </h1>
//                             <p className="text-gray-600 mt-1">
//                                 Manage and monitor deposit transactions
//                             </p>
//                         </div>
//                         <CreditCard className="w-8 h-8 text-blue-600" />
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
//                 {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//                     <div className="flex items-center">
//                         <Users className="w-8 h-8 text-blue-600 mr-3" />
//                         <div>
//                             <h2 className="text-lg font-semibold text-gray-800">
//                                 Total Registered Users
//                             </h2>
//                             <p className="text-3xl font-bold text-blue-600 mt-1">
//                                 {totalUsers.toLocaleString()}
//                             </p>
//                         </div>
//                     </div>
//                 </div> */}
//             <SearchBar/>

//                 {/* Deposits Section */}
//                 <div className="bg-white rounded-lg shadow-md">
//                     <div className="px-6 py-4 border-b border-gray-200">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                             Recent Deposits
//                         </h2>
//                         <p className="text-gray-600 text-sm mt-1">
//                             {depositData?.data.length || 0} deposits found
//                         </p>
//                     </div>
//                     <span className="text-5xl font-extrabold underline tracking-wider  flex justify-center items-center">


//                     Deposits List
//                     </span>
//                     <div className="p-6">
//                         {!depositData || depositData.data.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                                     No Deposits Found
//                                 </h3>
//                                 <p className="text-gray-600">
//                                     No deposit transactions have been recorded yet.
//                                 </p>
//                             </div>
//                         ) : (
//                             <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                                 {depositData?.data.map((deposit:addDepositTypes, index: number) => {
//                                     const { transactionId, imageFile,phoneNumber } = deposit;
                                    
//                                     return (
//                                         <div 
//                                             key={transactionId || index} 
//                                             className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
//                                         >
                                          
//                                             <div className="mb-4">
//                                                 <h3 className="text-sm font-bold text-gray-700 mb-1">
//                                                     Transaction ID : 
//                                                 <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
//                                                      {transactionId}
//                                                 </span>
//                                                 </h3>
//                                             </div>
//                                             <div className="mb-4">
//                                                 <h3 className="text-sm font-bold text-gray-700 mb-1">
//                                                     PhoneNumber : 
//                                                 <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
//                                                      {phoneNumber}
//                                                 </span>
//                                                 </h3>
//                                             </div>

                                           
//                                             {imageFile && (
//                                                 <div className="mb-4">
//                                                     <h4 className="text-sm font-bold text-gray-700 mb-2">
//                                                         Payment ScreenShot
//                                                     </h4>
//                                                     <div className="relative overflow-hidden rounded-md border">
//                                                         {/* <img 
//                                                             src={imageFile} 
//                                                             alt={`Receipt for transaction ${transactionId}`}
//                                                             className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
//                                                             onError={(e) => {
//                                                                 e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
//                                                             }}
//                                                         /> */}
//                                                         <a 
//   href={imageFile} 
//   target="_blank" 
//   rel="noopener noreferrer"
// >
//  <img 
//   src={imageFile} 
//   alt={`Receipt for transaction ${transactionId}`}
//   className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
//   onClick={() => {
//     window.location.href = imageFile; // ⬅️ Opens image in same tab
//   }}
//   onError={(e) => {
//     e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
//   }}
// />

// </a>

//                                                     </div>
//                                                 </div>
//                                             )}

                                        
                                            
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 </div> 
//             </div>
            
//       <div className="mt-8">
//         <Pagination
//           page={depositData?.pagination?.page || 1}
//           pages={depositData?.pagination?.pages || 1}
//           onPageChange={(newPage) => setPage(newPage)}
//         />
//       </div>
//         </div>
//     );
// };

// export default GetDeposit;