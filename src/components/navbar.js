import Link from "next/link";
import React, { useContext, useState } from "react";
import { ComingSoonCard } from "./comingSoonCard";
import { MenuItem } from "./menuItem";
import SidebarIcon from "@/icon/sidebar";
import { FoodContext } from "@/context/FoodProvider";

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(FoodContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div
      className={`w-full flex flex-col place-items-center justify-center gap-10 ${
        isSidebarOpen ? "opacity-20" : "opacity-100"
      }`}
    >
      <div className="fixed top-0 w-full flex justify-center bg-black z-30 py-4">
        <Link href={"/"}>
          <button className="text-6xl hover:scale-110 transition-all ease-in-out">
            FOOD MANIA<span className="text-xl">mantap</span>
          </button>
        </Link>
        <button
          onClick={toggleSidebar}
          className="md:hidden block absolute top-4 left-4"
        >
          <SidebarIcon width={30} fill={"#fff"} />
        </button>
      </div>
      <nav className="w-full sm:flex hidden flex-col items-center justify-center mt-24">
        <div className="lg:w-10/12 w-full h-10 flex flex-row justify-around text-2xl">
          <MenuItem title="CHICKEN" media="hover:border-b-2" />
          <MenuItem
            title="BREAKFAST"
            media="hover:border-b-2 xl:block hidden"
          />
          <MenuItem title="TRADITIONAL FOOD" media="hover:border-b-2" />
          <MenuItem
            title="GLUTEN-FREE"
            media="hover:border-b-2 xl:block hidden"
          />
          <Link href={`/all-foods/`}>
            <h2 className="hover:border-b-2">ALL FOODS</h2>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
