import axios from "axios";

export const UpdateFood = async (
  nameFood,
  descFood,
  ingreFood,
  imgFood,
  foodId,
  token
) => {
  try {
    const requestBody = {
      name: nameFood,
      description: descFood,
      imageUrl: imgFood,
      ingredients: [`${ingreFood}`],
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update-food/${foodId}`,
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
