import React, { useState } from "react";
import { ComingSoonCard } from "./comingSoonCard";

export const MenuItem = ({ title, media }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleShowCard = () => {
    setIsCardVisible(true);

    setTimeout(() => {
      setIsCardVisible(false);
    }, 1000);
  };

  return (
    <div className={`${media}`}>
      <h2 className={`cursor-pointer`} onClick={handleShowCard}>
        {title}
      </h2>
      {isCardVisible && <ComingSoonCard isShowCard={isCardVisible} />}
    </div>
  );
};
