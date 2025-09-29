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
const Base_Url_API = "https://srivagehotel-new.up.railway.app";

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
  queryParams.append("phoneNumber", searchParams.phoneNumber || "");
  queryParams.append("name", searchParams.name || "");
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

const getHotelApi = async (
  searchParams: searchParamsContact
): Promise<getroomsResponse> => {
  const queryParams = new URLSearchParams();
  // queryParams.append("title", searchParams.title || "");

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(`${Base_Url_API}/v2/rooms?${queryParams}`, {
      method: "GET",
      credentials: "include",
    });
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
  AddReviewEachHotelById
};
