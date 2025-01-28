import React, { useState } from "react";
import styles from "./Loading.module.css";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-5 bg-black flex items-center justify-center">
        <RingLoader
          color={"#0aad0a"}
          cssOverride={override}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
