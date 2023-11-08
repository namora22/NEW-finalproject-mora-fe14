import axios from "axios";
import React from "react";

export const GetUserInfo = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};
