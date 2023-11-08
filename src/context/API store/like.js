import axios from "axios";
import React from "react";

export const LikeFood = async (foodId, token) => {
  try {
    const requestBody = { foodId: foodId };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/like`,
      requestBody,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
