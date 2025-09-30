"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { heroImageApi, updateImageHomeApi } from "../Api";
import { Button } from "../components/ui/button";
import { AppContext } from "../context/AppNotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
// import Link from "next/link";

const UserProfile = () => {
  const { showToast ,isAdmin} = AppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    data: userProfileData,
    isLoading: userProfileLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: heroImageApi,
  });

  const { mutate: updateProfile, isPending: updateProfileLoading } =
    useMutation({
      mutationFn: (formData: FormData) => updateImageHomeApi(formData),
      onSuccess: () => {
        showToast({
          message: "Profile Updated Successfully!",
          type: "SUCCESS",
        });
        refetch();
        router.push("/");
      },
      onError: (error) => {
        console.error("Update error:", error);
        showToast({ message: "Error Updating Profile", type: "ERROR" });
      },
    });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (userProfileData?.imageFile) {
      setImagePreview(userProfileData.imageFile);
    }
  }, [userProfileData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileFormData = new FormData();
    if (imageFile) profileFormData.append("imageFile", imageFile);
    updateProfile(profileFormData);
  };

  if (userProfileLoading){

    return (
      <div className="flex justify-center items-start min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
  <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">

    {/* Image Upload Skeleton */}
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Image placeholder */}
        <div className="w-full aspect-square bg-gray-200 rounded-xl border-4 border-white shadow-md"></div>

        {/* Camera icon placeholder */}
        <div className="absolute -bottom-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full shadow-md"></div>
      </div>

      {/* Caption placeholder */}
      <div className="w-3/4 h-4 sm:h-5 bg-gray-300 rounded text-center"></div>
    </div>

    {/* Submit Button Skeleton */}
    <div className="flex justify-center">
      <div className="w-40 sm:w-48 md:w-52 h-10 sm:h-12 bg-gray-300 rounded-md"></div>
    </div>

  </div>
</div>

    )
  }

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
    <div className="flex justify-center items-start min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        {/* Image Upload Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="w-full aspect-square bg-gray-200 overflow-hidden border-4 border-white shadow-md rounded-xl">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  fill
                  alt="Profile"
                  className="object-cover rounded-xl"
                />
              ) : (
                <span className="flex justify-center items-center h-full text-center text-gray-500 text-sm sm:text-base">
                  Upload your Homepage Image
                </span>
              )}
            </div>

            {/* Camera Icon */}
            <label
              htmlFor="imageFile"
              className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <span className="text-sm text-gray-500 text-center px-4">
            Tap the camera icon to update your Homepage Image
          </span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={updateProfileLoading}
            className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md hover:cursor-pointer transition-colors ${
              updateProfileLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {updateProfileLoading ? "Updating…" : "Upload Home Image"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
