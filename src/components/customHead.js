import Head from "next/head";
import React from "react";

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default CustomHead;
