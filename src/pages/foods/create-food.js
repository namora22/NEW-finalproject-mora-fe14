import CustomHead from "@/components/customHead";
import { FoodContext } from "@/context/FoodProvider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function CreateFood() {
  const { createFood, token, setToken } = useContext(FoodContext);

  const [nameFood, setNameFood] = useState("");
  const [imgFood, setImgFood] = useState("");
  const [descFood, setDescFood] = useState("");
  const [ingreFood, setIngreFood] = useState("");

  const router = useRouter();

  if (typeof window !== "undefined") {
    const tokenUser = localStorage.getItem("token");
    setToken(tokenUser);
  }

  const handleCreateFood = async (event) => {
    event.preventDefault();

    try {
      const uploadedImageUrl = await handleUploadImage();

      if (uploadedImageUrl) {
        await createFood(
          formatName(nameFood),
          descFood,
          ingreFood,
          uploadedImageUrl,
          token
        );
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imgFood);

      const res = await axios.post(
        `https://api-bootcamp.do.dibimbing.id/api/v1/upload-image`,
        formData,
        {
          headers: {
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  const handleJumpHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-10 h-screen w-full bg-black text-white">
      <CustomHead title="Food Mania - Create Food" />
      <div className="flex flex-col items-start w-1/2">
        <button
          className="bg-orange-800 px-4 py-2 rounded w-40"
          onClick={handleJumpHome}
        >
          Home
        </button>
      </div>
      <form className="w-[50%] border-4 p-4">
        <div className="text-2xl text-center mb-6">Form Create Food</div>
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
            Food Image
          </label>
          <input
            type="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            // placeholder="Food Image"
            onChange={(e) => setImgFood(e.target.files[0])}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          onClick={handleCreateFood}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
