import CustomHead from "@/components/customHead";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarContent from "@/components/sidebarContent";
import { FoodContext } from "@/context/FoodProvider";
import EditIcon from "@/icon/edit-icon";
import Heart from "@/icon/heart";
import HeartFill from "@/icon/heart-fill";
import SidebarIcon from "@/icon/sidebar";
import TrashIcon from "@/icon/trash-icon";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const FoodDetails = () => {
  const {
    deleteFood,
    isLogin,
    roleUser,
    token,
    DislikeFood,
    LikeFood,
    setToken,
    GetReview,
    InputReview,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(FoodContext);
  const [showDelete, setShowDelete] = useState(false);
  const [food, setFood] = useState("");
  const [like, setLike] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [dataReview, setDataReview] = useState("");
  const [inputReview, setInputReview] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check the condition for redirect
    if (typeof window !== "undefined") {
      const itemToken = localStorage.getItem("token");
      if (itemToken) {
        setToken(itemToken);
      } else {
        router.push("/login");
      }
    }

    const { id } = router.query; //take URL as a params

    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/foods/${id}`,
          {
            headers: {
              apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFood(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getReview() {
      try {
        const res = await GetReview(id);
        setDataReview(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      fetchData();
      getReview();
      setLike(food.isLike);
    }
  }, [router.query.id, food.isLike, like, inputReview]);

  if (!food) {
    return null;
  }

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  const handleDelete = async () => {
    await deleteFood(food.id, token);
    router.push("/all-foods");
  };

  const handleUpdate = () => {
    router.push(`/foods/update-food/${food.id}`);
  };

  const handleDislikeButton = async () => {
    await DislikeFood(food.id, token);
    setLike(false);
  };

  const handleLikeButton = async () => {
    await LikeFood(food.id, token);
    setLike(true);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const res = await InputReview(rating, review, food.id, token);
    setInputReview(res);
    setReview("");
  };

  function formatDate(params) {
    const date = new Date(params.split("T")[0]);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateFormat = date.toLocaleDateString(undefined, options);
    return dateFormat;
  }

  function ratingStar(params) {
    if (params <= 0) {
      return "No Rating Yet";
    }

    return "★".repeat(params);
  }

  return (
    <div className="flex justify-center min-w-[600px] bg-black text-white">
      <div className="flex w-full">
        {/* Sidebar Content  */}
        <SidebarContent />

        <div className="min-w-[500px] md:ml-60 ml-4 mt-16 sm:mt-0 ">
          <Navbar />
          <div
            className={`transition-all duration-500 w-96 h-80 space-y-10 bg-gray-800 text-white rounded-3xl shadow-md flex flex-col justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ${
              showDelete
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } `}
          >
            <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
            <div className="flex justify-around w-full">
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setShowDelete(false)}
              >
                No
              </button>
            </div>
          </div>

          <div
            className={`px-0 py-5 transition-all duration-500 ${
              showDelete ? "opacity-20" : "opacity-100"
            }`}
          >
            <CustomHead title={`Food Mania- ${formatName(food.name)}`} />

            <section
              className={`grid place-items-center ${
                isSidebarOpen ? "opacity-20" : "opacity-100"
              }`}
            >
              <div className="grid place-items-center md:w-11/12 lg:w-2/3">
                <h1 className="text-center text-6xl">
                  {formatName(food.name)}
                </h1>
                <h5 className="text-center text-base mt-10">
                  {food.updatedAt === food.createdAt ? (
                    <div>
                      Created {formatDate(food.updatedAt)}
                      <p className="text-yellow-400 text-sm">
                        {ratingStar(food.rating)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      Updated {formatDate(food.updatedAt)}
                      <p className="text-yellow-400 text-sm">
                        {ratingStar(food.rating)}
                      </p>
                    </div>
                  )}
                </h5>
                <img
                  className="w-full mt-2"
                  src={food.imageUrl}
                  alt={food.name}
                />
                <div className="flex justify-between  items-center w-full mt-2 ">
                  <div className="flex items-center space-x-2">
                    {like ? (
                      <button onClick={handleDislikeButton}>
                        <HeartFill width={30} fill={"#C51f1A"} />
                      </button>
                    ) : (
                      <button onClick={handleLikeButton}>
                        <Heart width={30} fill={"#fff"} />
                      </button>
                    )}
                    <div>{`Liked by ${dataReview && food.totalLikes}`}</div>
                  </div>
                  {roleUser === "admin" && (
                    <div className="flex items-center space-x-2">
                      <button
                        className="button-delete bg-blue-500 hover:bg-red-500 px-4 py-2 rounded"
                        onClick={() => setShowDelete(true)}
                      >
                        <TrashIcon width={25} fill={"#fff"} />
                      </button>
                      <button
                        className="button-edit bg-blue-500 px-4 py-2 rounded"
                        onClick={handleUpdate}
                      >
                        <EditIcon width={25} fill={"#fff"} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-lg mt-5">{food.description}</p>
                <ul className="flex flex-col justify-start w-full mt-10">
                  <p className="font-bold text-xl">Ingredients :</p>
                  {food.ingredients.map((item, index) => (
                    <li key={index} className="text-lg">
                      {index + 1}. {item}
                    </li>
                  ))}
                </ul>
                <div className="w-full grid place-items-start mt-6 border-2">
                  <form className="flex flex-col space-y-2 w-full p-2 border-b-2">
                    <label htmlFor="food" className="text-2xl">
                      Review:
                    </label>
                    <select
                      className="text-yellow-500 w-min"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                      <option value={5}>★★★★★</option>
                      <option value={4}>★★★★</option>
                      <option value={3}>★★★</option>
                      <option value={2}>★★</option>
                      <option value={1}>★</option>
                    </select>
                    <textarea
                      typeof="text"
                      placeholder="Please share your thoughts about this food"
                      className="text-black p-1"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="p-2 border bg-slate-700 rounded-lg"
                        onClick={handleSubmitReview}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <div className="w-full">
                    {dataReview
                      ? dataReview.map((review, index) => (
                          <div
                            key={index}
                            className="flex flex-col w-full space-y-2 border-b p-4 "
                          >
                            <div className="flex space-x-2">
                              <img
                                className="w-10 h-10 rounded-full object-cover object-center"
                                src={review.user.profilePictureUrl}
                              />
                              <div className="flex items-center">
                                <p>{review.user.name}</p>
                              </div>
                            </div>
                            <div className="text-yellow-500 text-lg">
                              {ratingStar(review.rating)}
                            </div>
                            <div>{review.review ? review.review : "-"}</div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
