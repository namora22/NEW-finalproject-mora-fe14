import axios from "axios";

export const createFood = async (
  nameFood,
  descFood,
  ingreFood,
  imgFood,
  token
) => {
  try {
    const requestBody = {
      name: nameFood,
      description: descFood,
      imageUrl: imgFood,
      ingredients: [ingreFood],
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create-food`,
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
