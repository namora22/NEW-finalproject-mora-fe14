import "@/styles/globals.css";
import { useState } from "react";
import { FoodProvider } from "@/context/FoodProvider";

export default function App({ Component, pageProps }) {
  return (
    <FoodProvider>
      <Component {...pageProps} />
    </FoodProvider>
  );
}
