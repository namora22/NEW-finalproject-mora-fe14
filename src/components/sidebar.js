import { LogoutApi } from "@/context/API store";
import { FoodContext } from "@/context/FoodProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  const {
    setRoleUser,
    roleUser,
    token,
    setToken,
    GetUserInfo,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(FoodContext);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState("");

  //handle logout
  const handleLogoutAccount = async () => {
    const res = await LogoutApi(token);
    setToken("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    setIsSidebarOpen(false);
    router.push("/login");
  };

  if (typeof window !== "undefined") {
    const role = localStorage.getItem("role");
    const tokenUser = localStorage.getItem("token");
    setRoleUser(role);
    setToken(tokenUser);
  }

  const fetchUserInfo = async () => {
    const res = await GetUserInfo(token);
    setUserInfo(res);
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  if (!userInfo) {
    return null;
  }

  const handleLinkProfile = () => {
    setIsSidebarOpen(false);
    router.push("/profile/user");
  };

  const buttonHideSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className=" text-white h-full border-r left-0 top-0 flex flex-col p-4 text-xl">
      {isSidebarOpen && (
        <button
          onClick={buttonHideSidebar}
          className="absolute top-2 right-4 text-white text-2xl"
        >
          X
        </button>
      )}
      <div className="flex w-full mb-4">
        <Image
          src="/LogoFoodMania.png"
          alt="Food Mania"
          className="mx-auto w-20"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-2 flex flex-col">
          <Link
            href={`/`}
            className="flex justify-start items-center hover:bg-slate-800 rounded-3xl py-2 px-4 "
            onClick={() => setIsSidebarOpen(false)}
          >
            <Image
              src="/home.png"
              alt="Home"
              className="w-7"
              width={50}
              height={50}
            />
            <p className="ml-3">Home</p>
          </Link>
          <Link
            href={`/all-foods/`}
            className="flex justify-start items-center hover:bg-slate-800 rounded-3xl py-2 px-4 "
            onClick={() => setIsSidebarOpen(false)}
          >
            <Image
              src="/fork-and-knife-silhouette.png"
              alt="All Foods"
              className="w-7"
              width={50}
              height={50}
            />
            <p className="ml-3">All Foods</p>
          </Link>
          {roleUser === "admin" && (
            <Link
              href={`/foods/create-food/`}
              className="flex items-center hover:bg-slate-800 rounded-3xl py-2 px-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <img
                src="/add-square-button.png"
                alt="All Foods"
                className="w-7"
                width={50}
                height={50}
              />
              <p className="ml-3">Create Foods</p>
            </Link>
          )}
        </div>
        <div>
          {userInfo && (
            <button
              onClick={handleLinkProfile}
              className="flex items-center hover:bg-slate-800 rounded-3xl py-2 px-4"
            >
              <img
                src={userInfo.profilePictureUrl}
                alt="Update Profile"
                className="w-7 h-7 rounded-full object-cover object-center "
                width={50}
                height={50}
              />
              <p className="ml-3 text-left">{userInfo.name}</p>
            </button>
          )}

          <button
            className="flex hover:bg-red-700 rounded-3xl py-2 px-4"
            onClick={handleLogoutAccount}
          >
            <Image
              src="/sign-out-option.png"
              alt="Log Out"
              className="w-7"
              width={50}
              height={50}
            />
            <p className="ml-3">Sign-Out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
