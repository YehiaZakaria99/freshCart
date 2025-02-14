import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { userContext } from "../../Context/UserContext";
import RecentProducts from "./../RecentProducts/RecentProducts";
import axios from "axios";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "./../MainSlider/MainSlider";

export default function Home() {
  return (
    <>
      <div className="container py-10  text-[#1E293B]">
        <MainSlider />
        <CategoriesSlider />
        <div className="box py-6 md:w-4/5 w-full mx-auto">
          <RecentProducts />
        </div>
      </div>
    </>
  );
}
