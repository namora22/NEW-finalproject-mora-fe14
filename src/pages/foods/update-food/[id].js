import CustomHead from "@/components/customHead";
import { FoodContext } from "@/context/FoodProvider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const UpdateFood = ({ food }) => {
  const { UpdateFood, token, setToken } = useContext(FoodContext);
  const router = useRouter();

  const [nameFood, setNameFood] = useState(food.name);
  const [imgFood, setImgFood] = useState(food.imageUrl);
  const [descFood, setDescFood] = useState(food.description);
  const [ingreFood, setIngreFood] = useState([food.ingredients]);

  if (typeof window !== "undefined") {
    const tokenUser = localStorage.getItem("token");
    setToken(tokenUser);
  }

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let newImgUser = imgFood;
      if (imgFood !== food.imageUrl) {
        const uploadedImageUrl = await handleUploadImage();
        // setImgFood(uploadedImageUrl);
        newImgUser = uploadedImageUrl;
      } else {
        newImgUser = imgFood;
      }
      await UpdateFood(
        nameFood,
        descFood,
        ingreFood,
        newImgUser,
        food.id,
        token
      );
      router.push(`/foods/${food.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imgFood);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload-image`,
        formData,
        {
          headers: {
            apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = res.data.url;

      return uploadedImageUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleJumpHome = () => {
    router.push("/");
  };

  return (
    <div className="p-20 w-full flex flex-col items-center space-y-4 min-w-[600px] bg-black text-white">
      <CustomHead title={`Food Mania - Update Food ${formatName(food.name)}`} />
      <div className="flex flex-col items-center">
        <button
          className="bg-orange-800 px-4 py-2 rounded w-40"
          onClick={handleJumpHome}
        >
          Home
        </button>
      </div>
      <form className="lg:w-[50%] w-[80%] border-4 p-4 ">
        <div className="text-2xl text-center mb-6">Form Update Food</div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name Food
          </label>
          <input
            type="text"
            value={nameFood}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name of Your Food"
            onChange={(e) => setNameFood(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Description
          </label>
          <textarea
            type="text"
            value={descFood}
            className="bg-gray-50 h-40 border border-gray-300 text-gray-900 text-sm min-h-min rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Description"
            onChange={(e) => setDescFood(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Ingredients
          </label>
          <input
            type="text"
            value={ingreFood}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Ingredients"
            onChange={(e) => setIngreFood(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Image Url
          </label>
          <img className="w-full mb-2" src={food.imageUrl} alt={food.name} />
          <input
            type="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setImgFood(e.target.files[0])}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          onClick={handleUpdate}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/foods/${params.id}`,
    {
      headers: {
        apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(params);
  const data = await res.data.data;
  return {
    props: { food: data },
  };
}

export default UpdateFood;
