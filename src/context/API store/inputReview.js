import axios from "axios";
import React from "react";

export const InputReview = async (isRating, isReview, foodId, token) => {
  try {
    const requestBody = {
      rating: isRating,
      review: isReview,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/rate-food/${foodId}`,
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
    console.log(error);
    throw error;
  }
};
