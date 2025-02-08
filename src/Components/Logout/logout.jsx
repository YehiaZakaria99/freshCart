import React from "react";
import { useNavigate } from "react-router-dom";

export default function logOut(navigate, setUserToken, setUserIcon, setCart, setWishListData ) {
  localStorage.removeItem("userToken");
  setUserToken("");
  setUserIcon(false);
  navigate("/login");
  setCart(null);
  setWishListData(null);
}
