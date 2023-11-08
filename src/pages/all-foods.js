import CustomHead from "@/components/customHead";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarContent from "@/components/sidebarContent";
import { FoodContext } from "@/context/FoodProvider";
import Heart from "@/icon/heart";
import HeartFill from "@/icon/heart-fill";
import SidebarIcon from "@/icon/sidebar";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function Foods() {
  const {
    dataFood,
    getFood,
    setDataFood,
    token,
    setToken,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(FoodContext);

  const fetchFood = async () => {
    try {
      const foods = await getFood(token);
      setDataFood(foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const itemToken = localStorage.getItem("token");
      if (itemToken) {
        setToken(itemToken);
        // setIsLogin(true);
      } else {
        router.push("/login");
      }
    }
    if (token) {
      fetchFood();
    }
  }, [token]);

  if (!dataFood) {
    return null;
  }

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  function ratingStar(params) {
    if (params <= 0) {
      return "No Ratings Yet";
    }

    return <div className="text-yellow-500">{"★".repeat(params)}</div>;
  }

  return (
    <div className="flex justify-center min-w-[600px] bg-black text-white">
      <div className="flex w-full">
        {/* Sidebar Content  */}
        <SidebarContent />

        <div
          className={`space-y-10 w-full md:ml-60 ml-0 mt-10 sm:mt-0 ${
            isSidebarOpen ? "opacity-20" : "opacity-100"
          }`}
        >
          <Navbar />
          <CustomHead title="Food Mania - All Food" />
          <section className="w-full flex flex-col items-center space-y-10">
            {dataFood
              ? dataFood.map((food, index) => (
                  <Link
                    key={index}
                    href={`foods/${food.id}`}
                    className="w-11/12 md:w-3/4 grid grid-cols-1 xl:grid-cols-2 gap-0 hover:outline"
                  >
                    <div className="h-96 w-full">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={food.imageUrl}
                      />
                    </div>
                    <div className="bg-slate-800 w-full flex-col flex  justify-center items-center gap-3 p-4">
                      <h2 className="text-4xl text-left w-full">
                        {formatName(food.name)}
                      </h2>
                      <p>{food.description}</p>
                      <p>{ratingStar(food.rating)}</p>
                      <div>
                        {food.isLike ? (
                          <HeartFill width={30} fill={"#C51f1A"} />
                        ) : (
                          <Heart width={30} fill={"#fff"} />
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              : null}
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Foods;
