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
      <div className="">
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
