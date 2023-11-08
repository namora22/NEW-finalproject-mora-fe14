import axios from "axios";
import React from "react";

export const registerApi = async (
  isName,
  isEmail,
  isPass,
  isConPass,
  isRole,
  isProfileUrl,
  isPhoneNumber
) => {
  try {
    const requestBody = {
      name: isName,
      email: isEmail,
      password: isPass,
      passwordRepeat: isConPass,
      role: isRole,
      profilePictureUrl: isProfileUrl,
      phoneNumber: isPhoneNumber,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`,
      requestBody,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
