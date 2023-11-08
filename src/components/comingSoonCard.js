import React from "react";

export const ComingSoonCard = ({ isShowCard }) => {
  return (
    <div
      className={`transition-opacity ease-in-out text-sm p-2 bg-slate-600 w-28 absolute z-10 ${
        isShowCard ? "opacity-100" : "opacity-0 cursor-none"
      }`}
    >
      <p className="text-center">Coming Soon</p>
    </div>
  );
};
