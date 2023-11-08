import CustomHead from "@/components/customHead";
import { FoodContext } from "@/context/FoodProvider";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function User() {
  const { token, setToken, GetUserInfo } = useContext(FoodContext);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState("");

  if (typeof window !== "undefined") {
    const tokenUser = localStorage.getItem("token");
    setToken(tokenUser);
  }

  const fetchUserInfo = async () => {
    const res = await GetUserInfo(token);
    setUserInfo(res);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  if (!userInfo) {
    return null;
  }

  const handleUpdateButton = () => {
    router.push(`/profile/update/`);
  };

  const handleJumpHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <button
        className="bg-orange-800 mb-4 px-4 py-2 rounded w-40"
        onClick={handleJumpHome}
      >
        Home
      </button>
      <CustomHead title="Profile User" />
      {userInfo && (
        <div className="bg-slate-700 text-white flex flex-col justify-center items-center rounded-3xl w-[500px] h-[800px] space-y-3">
          <h1 className="text-center text-6xl mb-10">PROFILE</h1>
          <img
            src={userInfo.profilePictureUrl}
            alt="Update Profile"
            className="w-44 h-44 rounded-full object-cover object-center border border-white"
            width={50}
            height={50}
          />
          <div className="px-4 py-2 border-b-2 w-11/12">
            <div className="font-light">Name</div>
            <div className="text-lg font-semibold">{userInfo.name}</div>
          </div>
          <div className="px-4 py-2 border-b-2 w-11/12">
            <div className="font-light">Phone Number</div>
            <div className="text-lg font-semibold">{userInfo.phoneNumber}</div>
          </div>
          <div className="px-4 py-2 border-b-2 w-11/12">
            <div className="font-light">E-mail</div>
            <div className="text-lg font-semibold">{userInfo.email}</div>
          </div>
          <div className="w-11/12 flex justify-end items-center">
            <button
              onClick={handleUpdateButton}
              className="p-4 border rounded-3xl hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
