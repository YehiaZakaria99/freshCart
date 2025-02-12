import React from "react";
import { useNavigate } from "react-router-dom";

export default function logOut(navigate, setUserToken , setCart, setWishListData ) {
  localStorage.removeItem("userToken");
  setUserToken("");
  navigate("/login");
  setCart(null);
  setWishListData(null);
}
