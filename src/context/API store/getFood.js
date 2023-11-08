import axios from "axios";

export const getFood = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/foods`,
      {
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const dataFood = res.data.data.filter(
      (item) => item.imageUrl && item.imageUrl !== "-"
    );

    return dataFood;
  } catch (error) {
    console.log(error);
  }
};
