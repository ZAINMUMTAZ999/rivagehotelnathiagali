"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { View, EyeOff } from "lucide-react";
import { loginApi } from "../Api";

export type loginUserTypes = {
  email: string;
  password: string;

  role: {
  
    enum: ["admin", "user"];
  };
};
import { useState } from "react";

import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context/AppNotify";


export type loginTypes = {
  email: string;
  password: string;
};
export default function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [passwordType, setPasswordType] = useState("password");
  const [PasswordVisible, setPasswordVisible] = useState(false);
const togglePasswordVisibility = () => {
  setPasswordVisible((prev) => !prev);
  setPasswordType((prev) => (prev === "password" ? "text" : "password"));
};


  const { showToast } = AppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserTypes>();

  const { mutate: apiMutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "Successfully Login" });
 
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      
      router.push("/");
    },
    onError: (error:Error) => {
      showToast({ type: "ERROR", message: error?.message });

    },
  });
  const onSubmit = handleSubmit((data) => {
    apiMutate(data);
  });
  return (
    <form
      className="flex flex-col mt-32 bg-neutral-50 rounded-lg  w-full md:w-1/2 h-auto p-4 mx-auto "
      onSubmit={onSubmit}
    >
      <h2 className="flex justify-center text-4xl font-bold text-gray-800 ">Login</h2>
      <div className="flex flex-col gap-4 ">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email:
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-300">{errors.email.message}</span>
          )}
        </label>
        <div className="relative">

        
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password:
          <input
            type={passwordType}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              minLength: {
                value: 6,
                message: "password must be 6 characters",
              },
              required: "Password is required",
            })}
          />
          <span
          role="button"
  aria-label="Toggle password visibility"
            onClick={togglePasswordVisibility}
            className="absolute -m-8 mt-1 hover:cursor-pointer"
          >
            {PasswordVisible ? <View /> : <EyeOff />}
          </span>
          {errors.password && (
            <span className="text-sm text-red-300">
              {errors.password.message}
            </span>
          )}
        </label>
        </div>
        {/* <span className="flex ">
          <Link
            href="/register"
            className="underline font-semibold tracking-tighter hover:text-lg"
          >
            Register your acccount?{" "}
          </Link>
        </span> */}
      </div>
   

   
<div className="flex justify-center mt-2">
  {isPending ? (
    <button
      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2
                 text-white transition disabled:cursor-not-allowed disabled:opacity-70"
      disabled
      aria-busy="true"
    >
      <svg
        className="mr-2 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Loading…
    </button>
  ) : (
    <button
      type="submit"
      className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium
                 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-blue-400"
    >
      Submit
    </button>
  )}
</div>

    
    </form>
  );
}
