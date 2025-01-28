import React, { useState } from "react";
import styles from "./Loading.module.css";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-40 bg-[#222] flex items-center justify-center">
        <HashLoader
          color={"#0aad0a"}
          cssOverride={override}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
