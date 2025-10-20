import { addHotelTypes } from "./components/AddHotel";

export type contactUsTypes = {
  userId: string;
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  message: string;
};
export type contactUsResponse = {
  data: contactUsTypes[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type loginUserTypes = {
  email: string;
  password: string;

  role: {
    // type: String,
    // required: true,
    enum: ["admin", "user"];
  };
};

export type registerUserTypes = {
  _id: string;
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  imageFile: string;
};

export type getroomsResponse = {
  data: getroomTypes[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
export type getroomTypes = {
  _id: string;
  userId: string;
  name: string;
  city: string;

  description: string;
  type: string;
  // adultCount: number;
  // childCount: number;
  facilities: string[];
  pricePerNight: number;
  // starRating: number;
  imageUrls: string[];
  imageFiles: FileList;
  roomStatus: string;
  lastUpdated: Date;
};
export type addReviewTypes = {
  userId: string;
  _id: string;

  name: string;
  // email: string;
  // phoneNumber: number;
  // interestedIn: string;
  message: string;
};

// const Base_Url_API = "http://localhost:8000";
const Base_Url_API = "https://68f678bd8aeddedb9b2323c8--voluble-kringle-0e3364.netlify.app/api";
// const API_PREFIX = "/api"; // <-- Required prefix confirmed by Postman success

const deleteJobApi = async (hotelId: string) => {
  // The final constructed URL is now correct: ...app/v2/delete/hotelId
  const response = await fetch(`${Base_Url_API}/delete/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job");
  }

  return await response.json();
};
// const deleteJobApi = async (hotelId: string) => {
//   const response = await fetch(`${Base_Url_API}/delete/${hotelId}`, {
//     method: "DELETE",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json"
//     }
//     // No body needed for simple deletion by ID
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || "Failed to delete job");
//   }

//   return await response.json();
// };
const upadteHotelBYId = async(hotelId: string, hotelFormData: FormData) => {
  // Now the API implementation can use both parameters correctly:
  const response = await fetch(`${Base_Url_API}/v2/edit/${hotelId}`, {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
  });
   if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job");
  }

  return await response.json();
  
}
const AddHotelApi = async (hotelFormData: FormData) => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/addRoom`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
const EditHotelById = async (hotelId: string):Promise<addHotelTypes> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/edit/${hotelId}`, {
 
      credentials: "include",
   
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
const AddHeroImageApi = async (hotelFormData: FormData) => {
  try {
    const response = await fetch(`${Base_Url_API}/v3/addHeroImage`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
 const getHotelApiBId = async (id:string):Promise<addHotelTypes> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/rooms/${id}`, {

    credentials: "include"
  });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
     return data as addHotelTypes;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

const registerApi = async (formDatajson: registerUserTypes) => {
  const response = await fetch(`${Base_Url_API}/v1/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

// http://localhost:8000/api/login
const loginApi = async (formDatajson: loginUserTypes) => {
  const response = await fetch(`${Base_Url_API}/v2/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    console.log("login Api 30");
    throw new Error("login Error Api");
  }
  // console.log("response:", responseBody);
  return responseBody;
};

// const validateToken = async () => {
//   const response = await fetch(  `${Base_Url_API}/v2/validate-token`, {
//     credentials: "include",
//   });
//   if (!response.ok) {
//     throw new Error("fetch error validate-token");
//   }
//   return await response.json();
// };
// Example of what your frontend validateToken API function might look like (in Api.ts or similar)
const validateToken = async (): Promise<{ userId: string; role: string }> => {
  const response = await fetch(`${Base_Url_API}/v2/validate-token`, {
    // Adjust API_BASE_URL
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Ensure credentials (cookies) are sent if your API expects them
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to validate token");
  }
  return response.json();
};
const LogoutApi = async () => {
  const response = await fetch(`${Base_Url_API}/v2/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("logout api not fetch");
  }
  return response.json();
};

const contactUsApi = async (formData: contactUsTypes) => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/contactUs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export type searchParamsContact = {
  phoneNumber?: string;
  name?: string;
  page?: string;
};
const searchPageContact = async (
  searchParams: searchParamsContact
): Promise<contactUsResponse> => {
  const queryParams = new URLSearchParams();
    if (searchParams.phoneNumber) queryParams.append("phoneNumber", searchParams.phoneNumber);
  if (searchParams.name) queryParams.append("name", searchParams.name);
  if (searchParams.page) queryParams.append("page", searchParams.page);
  // queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(
      `${Base_Url_API}/v2/contactUs?${queryParams.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!repsonse.ok) {
      throw new Error("Something Went Wrong!");
    }
    // console.log(await repsonse.json())
    const data = await repsonse.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
// console.log(searchPage);
// import { addReviewTypes } from "../../../backend/src/models/addReview.models";
export type addHeroImageTypes = {
  userId: string;
  _id: string;

  imageFile: string;
};
const updateImageHomeApi = async (hotelFormData: FormData) => {
  const response = await fetch(`${Base_Url_API}/v2/UpdateUser`, {
    method: "PUT",
    body: hotelFormData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

const heroImageApi = async (): Promise<addHeroImageTypes> => {
  const response = await fetch(`${Base_Url_API}/v2/homeImage`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};
const AddReviewApi = async (formdata: {
  name: string;
  message: string;
}): Promise<addReviewTypes> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/addReview`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // important for JSON
      },
      body: JSON.stringify(formdata),
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
export type AddBookingTypes = {
  userId: string;
  _id: string;
  name: string;
  phoneNumber: string;
  Amount: string;
  time: string;
  
  createdAt: Date;
};
const AddBookingApi = async (formdata: {
  name: string; 
  phoneNumber: string;
  Amount: string;
  time: string;
}): Promise<AddBookingTypes> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/addBookings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // important for JSON
      },
      body: JSON.stringify(formdata),
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
const GetReviewsApi = async (): Promise<addReviewTypes[]> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/addReview`, {
      // method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
const GetAllReviewsApi = async (): Promise<addReviewTypes[]> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/allReview`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
 type bookingSearchResponse = {
      data: AddBookingTypes[];
      pagination: {
        total: number;
        page: number;
        pages: number;
      };
    };
export type searchParamsBooking = {
  phoneNumber?: string;
  name?: string;
  page?: string;
};
const GetAllBookingsApi = async (
  searchParams: searchParamsBooking
): Promise<bookingSearchResponse> => {
    const queryParams = new URLSearchParams();
    if (searchParams.phoneNumber) queryParams.append("phoneNumber", searchParams.phoneNumber);
  if (searchParams.name) queryParams.append("name", searchParams.name);
  if (searchParams.page) queryParams.append("page", searchParams.page);
  try {
    const response = await fetch(`${Base_Url_API}/v2/allbooking?${queryParams.toString()}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
export type userTypes = {
  firstName: string;
  userId: string;
};
type SearchParams = {
  name?: string;        // ✅ hotel/room name
  city?: string;        // optional
  maxPrice?: string;    // optional
  sortOption?: string;
  page?: string;
};
const getHotelApi = async (searchParams: SearchParams): Promise<getroomsResponse> => {
  const queryParams = new URLSearchParams();

  if (searchParams.name)      queryParams.append("name", searchParams.name);
  if (searchParams.city)      queryParams.append("city", searchParams.city);
  if (searchParams.maxPrice)  queryParams.append("maxPrice", searchParams.maxPrice);
  if (searchParams.sortOption)queryParams.append("sortOption", searchParams.sortOption);
  if (searchParams.page)      queryParams.append("page", searchParams.page);

  try {
    const response = await fetch(`${Base_Url_API}/v2/rooms?${queryParams.toString()}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Something Went Wrong!");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Something Went Wrong!");
  }
};

// const getHotelApi = async (
//   searchParams: searchParamsSearch
// ): Promise<getroomsResponse> => {
//   const queryParams = new URLSearchParams();
//   queryParams.append("title", searchParams.title || "");
//   queryParams.append("sortOption", searchParams.sortOption || "");

//   queryParams.append("page", searchParams.page || "");
//   try {
//     const repsonse = await fetch(`${Base_Url_API}/v2/rooms?${queryParams}`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (!repsonse.ok) {
//       throw new Error("Something Went Wrong!");
//     }
//     // console.log(await repsonse.json())
//     const data = await repsonse.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something Went Wrong!");
//   }
// };

export type AddReviewTypesId = {
  _id: string; 
  name: string; 
  message: string; 

};

const GetReviewEachHotelById = async (
  hotelId: string
): Promise<AddReviewTypesId[]> => {
  try {
    const response = await fetch(
      `${Base_Url_API}/v2/rooms/${hotelId}/reviews`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
type NewReviewPayload = {
  name: string;
  message: string;
};

 const AddReviewEachHotelById = async (
  id: string,
  payload: NewReviewPayload
): Promise<AddReviewTypesId> => {
  try {
    const response = await fetch(
      `${Base_Url_API}/v2/rooms/${id}/reviews`,
      {
        method: "POST",
        credentials: "include",        // keep if you rely on cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add review");
    }

    return (await response.json()) as AddReviewTypesId;
  } catch (error) {
    console.error("AddReview error:", error);
    throw error;
  }
};


export {
  registerApi,
  loginApi,
  validateToken,
  LogoutApi,
  AddReviewApi,
  contactUsApi,
  GetReviewsApi,
  heroImageApi,
  GetAllReviewsApi,
  getHotelApi,
  AddHotelApi,
  searchPageContact,
  AddHeroImageApi,
  updateImageHomeApi,
  GetReviewEachHotelById,
  getHotelApiBId,
  AddReviewEachHotelById,
  AddBookingApi,
  GetAllBookingsApi,
  EditHotelById,
  deleteJobApi,
  upadteHotelBYId
};
