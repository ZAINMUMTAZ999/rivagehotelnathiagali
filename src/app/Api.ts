export type contactUsTypes = {
userId: string;
_id:string;
name: string;
email: string;
phoneNumber: number;
interestedIn: string;
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
    enum: ["admin", "user"],
  },

};
export type addBlogTypes = {
userId: string;
_id:string;
title: string;
description: string;
imageFile: string;
textEditor: string;
date:Date;
  createdAt?: Date; 
  updatedAt?: Date;

};
// enum Role {
//   User = "user",
//   Admin = "admin",
// }
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
export type blogSearchResponse = {
  data: addBlogTypes[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
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
roomStatus:string,
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



const Base_Url_API = "https://backendrivagehotelnathiagali-production.up.railway.app"
// const Base_Url_API = "http://localhost:8000";
export const AddHotelApi = async (hotelFormData: FormData) => {
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
export const AddHeroImageApi = async (hotelFormData: FormData) => {
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

const addBlogApi = async (formData: FormData) => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/addBlog`, {
      method: "POST",
      credentials: "include",
      body: formData,
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
const getContactUsApi = async (): Promise<contactUsResponse[]> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/contactUs`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("blogApi not fetched");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

// type searchParams = {
  
//   page?: string;
// };
const searchPage = async (searchParams: { page: string; }
  // searchParams: searchParams
): Promise<blogSearchResponse> => {
  const queryParams = new URLSearchParams();
  // queryParams.append("title", searchParams.title || "");

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(
      `${Base_Url_API}/v2/search?${queryParams}`,
      // "http://localhost:8000/v2/blogs",
      {
        method: "GET",
        credentials: "include",
          // cache: 'no-store'
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
export type searchParamsContact = {
  title?: string;
  page?: string;
};
export const searchPageContact = async (
  searchParams: searchParamsContact
): Promise<getroomsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("title", searchParams.title || "");

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(
      `${Base_Url_API}/v2/contactUs?${queryParams}`,
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
export const updateImageHomeApi = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${Base_Url_API}/v2/UpdateUser`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};
export const ImaeHoeApi2232 = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${Base_Url_API}/adbwe/UpdateUser`,
    {
      method: "Psdnie",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export const heroImageApi = async ():Promise<addHeroImageTypes> => {


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
  message: string
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
export type userTypes = {
  firstName: string;
  userId: string;
};
const getUserInfoApi = async (): Promise<userTypes[]> => {
  try {
    const response = await fetch(`${Base_Url_API}/v2/login`, {
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
    export const getHotelApi = async (
searchParams: searchParamsContact
): Promise<getroomsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("title", searchParams.title || "");

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(
      `${Base_Url_API}/v2/rooms?${queryParams}`,
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
const getRegisteredUser = async (): Promise<registerUserTypes[]> => {
  try {
  const response = await fetch(`${Base_Url_API}/v1/allRegisteredUser`, {
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
const allRegisteredUserApi = async (): Promise<registerUserTypes[]> => {
  try {
    const response = await fetch(`${Base_Url_API}/v1/allRegisteredUser`, {
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

export default AddReviewApi;

export {
  registerApi,
  loginApi,
  validateToken,
  LogoutApi,
  addBlogApi,
  // allBlogsApi,
  searchPage,
  contactUsApi,
  getContactUsApi,
  AddReviewApi,
  GetReviewsApi,
  getUserInfoApi,
  getRegisteredUser,
  GetAllReviewsApi,
  allRegisteredUserApi
};
