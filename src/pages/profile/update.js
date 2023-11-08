import CustomHead from "@/components/customHead";
import { FoodContext } from "@/context/FoodProvider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const UpdateProfile = () => {
  const { UpdateProfile, token, setToken, GetUserInfo } =
    useContext(FoodContext);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [emailUser, setEmailUser] = useState("");

  if (typeof window !== "undefined") {
    const tokenUser = localStorage.getItem("token");
    setToken(tokenUser);
  }

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let newImgUser = imgUser;
      if (imgUser !== userInfo.profilePictureUrl) {
        const uploadedImageUrl = await handleUploadImage();
        newImgUser = uploadedImageUrl;
      } else {
        newImgUser = imgUser;
      }

      await UpdateProfile(
        formatName(nameUser),
        emailUser,
        newImgUser,
        phoneUser,
        token
      );
      router.push(`/profile/user`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imgUser);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload-image`,
        formData,
        {
          headers: {
            apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = res.data.url;

      return uploadedImageUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleJumpHome = () => {
    router.push("/");
  };

  const fetchDataUser = async () => {
    const res = await GetUserInfo(token);
    setUserInfo(res);
  };

  useEffect(() => {
    if (token) {
      fetchDataUser();
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setNameUser(userInfo.name);
      setImgUser(userInfo.profilePictureUrl);
      setPhoneUser(userInfo.phoneNumber);
      setEmailUser(userInfo.email);
    }
  }, [userInfo]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="p-20 w-full flex flex-col items-center space-y-4 bg-black text-white">
      <CustomHead title={`Food Mania - Update Profile`} />
      <div className="flex flex-col items-start w-1/2">
        <button
          className="bg-orange-800 px-4 py-2 rounded w-40"
          onClick={handleJumpHome}
        >
          Home
        </button>
      </div>
      <form className="w-[50%] border-4 p-4">
        <div className="text-2xl text-center mb-6">Form Update Profile</div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name
          </label>
          <input
            type="text"
            value={nameUser}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name of Your Food"
            onChange={(e) => setNameUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            E-mail
          </label>
          <input
            type="text"
            value={emailUser}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Ingredients"
            onChange={(e) => setEmailUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneUser}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm min-h-min rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Description"
            onChange={(e) => setPhoneUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Profile Picture
          </label>
          <img
            className="mb-2 w-52"
            src={userInfo.profilePictureUrl}
            alt={userInfo.name}
          />
          <input
            type="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setImgUser(e.target.files[0])}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
