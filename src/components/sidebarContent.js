import { FoodContext } from "@/context/FoodProvider";
import React, { useContext } from "react";
import Sidebar from "./sidebar";

const SidebarContent = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(FoodContext);
  return (
    <div
      className={`bg-black transition-all duration-300 ease-in-out fixed w-60 md:left-0 h-screen z-40 ${
        isSidebarOpen ? "top-0 left-0 bg-black z-10" : "left-[-250px]"
      }`}
    >
      <Sidebar />
    </div>
  );
};

export default SidebarContent;
