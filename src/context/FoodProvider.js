import React, { createContext, useEffect, useState } from "react";
import {
  createFood,
  getFood,
  deleteFood,
  UpdateFood,
  loginApi,
  registerApi,
  LogoutApi,
  LikeFood,
  DislikeFood,
  GetReview,
  InputReview,
  GetUserInfo,
  UpdateProfile,
} from "../context/API store/index.js";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [dataFood, setDataFood] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [roleUser, setRoleUser] = useState("");
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchFood = async () => {
    try {
      setIsLogin(true);
      const foods = await getFood(token);
      setDataFood(foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFood();
    }
  }, [token]);

  return (
    <FoodContext.Provider
      value={{
        setDataFood,
        getFood,
        dataFood,
        createFood,
        deleteFood,
        UpdateFood,
        loginApi,
        registerApi,
        isLogin,
        setIsLogin,
        roleUser,
        setRoleUser,
        token,
        setToken,
        LogoutApi,
        LikeFood,
        DislikeFood,
        GetReview,
        InputReview,
        GetUserInfo,
        UpdateProfile,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
