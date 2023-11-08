import axios from "axios";
import React from "react";

export const LogoutApi = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/logout`,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return res;
  } catch (error) {
    return error;
  }
};
