import { FoodContext } from "@/context/FoodProvider";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import CustomHead from "@/components/customHead";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import SidebarContent from "@/components/sidebarContent";

export default function Home() {
  const {
    isLogin,
    dataFood,
    roleUser,
    token,
    setToken,
    setIsLogin,
    isSidebarOpen,
  } = useContext(FoodContext);
  const router = useRouter();

  useEffect(() => {
    //handle token in local storage
    if (typeof window !== "undefined") {
      const itemToken = localStorage.getItem("token");
      if (itemToken) {
        setToken(itemToken);
        setIsLogin(true);
      } else {
        router.push("/login");
      }
    }
  }, [isLogin]);

  if (!dataFood) {
    return null;
  }

  //change format name of food
  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  //create star rating
  function ratingStar(params) {
    if (params <= 0) {
      return "No Ratings Yet";
    }

    return "★".repeat(params);
  }

  //function for latest food contents
  const foods = (params) => {
    return (
      <Link href={`foods/${dataFood[params].id}`}>
        <img
          className="w-full h-full object-cover object-center"
          src={dataFood[params].imageUrl}
        />
        <div className="text-yellow-500">
          {ratingStar(dataFood[params].rating)}
        </div>
        <div>{formatName(dataFood[params].name)}</div>
      </Link>
    );
  };

  return (
    //
    <div className="flex justify-center min-w-[600px]">
      <div className="flex w-full">
        {/* Sidebar Content  */}
        <SidebarContent />

        {/* Main Content  */}
        <div
          className={`w-full md:ml-60 ml-0 mt-10 sm:mt-0 ${
            isSidebarOpen ? "opacity-20" : "opacity-100"
          }`}
        >
          <div
            className={`flex bg-black text-white min-h-screen flex-col items-center justify-between gap-6`}
          >
            <CustomHead title="Food Mania" />
            <section className="w-full flex flex-col place-items-center justify-center gap-10">
              <Navbar />

              {/* Main food in Landing Page */}
              <section className="w-full flex flex-col items-center ">
                <Link
                  href={`foods/${dataFood[4].id}`}
                  className="w-11/12 lg:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-0 hover:scale-110 transition-all duration-500 ease-in-out"
                >
                  <div className="h-96 w-full">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={dataFood[4].imageUrl}
                    />
                  </div>
                  <div className="bg-slate-800 w-full flex-col flex  justify-center items-center gap-3 p-4">
                    <h2 className="text-4xl text-left w-full">
                      {formatName(dataFood[4].name)}
                    </h2>
                    <p className="">{dataFood[4].description}</p>
                  </div>
                </Link>
              </section>

              {/* Super Delicious Content  */}
              <section className="w-full flex flex-col items-center mb-10">
                <div className="lg:w-3/5 w-11/12">
                  <h2 className="text-4xl mb-2">Super Delicious</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {foods(2)}
                    {foods(7)}
                    {foods(17)}
                  </div>
                </div>
              </section>

              {/* Tasteful Content  */}
              <section className="w-full flex flex-col items-center mb-10">
                <div className="lg:w-3/5 w-11/12">
                  <h2 className="text-4xl mb-2">Tasteful</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {foods(8)}
                    {foods(15)}
                    {foods(19)}
                  </div>
                </div>
              </section>

              {/* Subscribe E-mail */}
              <section className="w-full flex flex-col justify-center items-center bg-slate-800 py-16">
                <div className="w-96 text-center">
                  <h1 className="text-6xl mb-2">Deliciousness to your inbox</h1>
                  <p className="mb-2">
                    Enjoy weekly hand picked foods and recommendations
                  </p>
                  <div className="flex pb-8">
                    <input
                      type="text"
                      className="rounded-md w-4/5 p-1"
                      placeholder="Email Address"
                    />
                    <button className="bg-slate-500 w-1/5 h-10 rounded-md">
                      JOIN
                    </button>
                  </div>
                </div>
              </section>

              {/* Latest Food Journals  */}
              <section className="lg:w-3/5 w-11/12 flex flex-col justify-center items-center">
                <h2 className="text-4xl text-left mb-4 w-full">
                  Latest Food Journals
                </h2>
                <div className="w-full grid grid-cols-4 gap-4">
                  {dataFood.map(
                    (food, index) =>
                      index <= 11 && (
                        <Link
                          key={index}
                          href={`foods/${food.id}`}
                          className="mb-10"
                        >
                          <img
                            className="w-full h-full object-cover object-center"
                            src={food.imageUrl}
                          />
                          <div>{formatName(food.name)}</div>
                        </Link>
                      )
                  )}
                </div>
              </section>
              <Footer />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
