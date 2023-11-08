import axios from "axios";

export const UpdateProfile = async (
  nameUser,
  emailUser,
  profilePictureUrl,
  phoneNumber,
  token
) => {
  try {
    const requestBody = {
      name: nameUser,
      email: emailUser,
      profilePictureUrl: profilePictureUrl,
      phoneNumber: phoneNumber,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update-profile`,
      requestBody,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
