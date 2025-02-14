import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("userToken")) {
  //     // Check if the pathname is the root (i.e., "/")
  //     if (location.pathname === "/") {
  //       // Redirect to "/home" if the path is "/"
  //       navigate("/home", { replace: true });
  //     }
  //   }
  // }, [location, navigate]); // Only run when location or navigate changes

  return (
    <>
      <Navbar />
      <div className="overflow-auto bg-[#F5F5F5]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
