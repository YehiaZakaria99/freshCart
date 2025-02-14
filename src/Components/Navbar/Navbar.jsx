import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import freshcartLogo from "../../assets/images/navbar/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { jwtDecode } from "jwt-decode";
import logOut from "../Logout/logout";
import DropDown from "../DropDownComponent/DropDown";
import UserSection from "./../UserSection/UserSection";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  const { cart, setCart } = useContext(CartContext);
  const { wishListData ,setWishListData } = useContext(wishListContext);

  let navigate = useNavigate();
  let [decoded, setDecoded] = useState("");

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      setDecoded(jwtDecode(JSON.stringify(userToken)));
    }
  }, [userToken]);

  return (
    <>
      <nav className="py-5 bg-[#222222]  shadow-[0_0_0px] fixed z-[99999] w-full">
        <div className="container">
          <div className="box flex justify-between flex-wrap items-center gap-y-3 ">
              <NavLink to={""}>
                <img className="w-32 freshcartLogo" src={freshcartLogo} alt="freshcartLogo" />
              </NavLink>
              {userToken && (
                <div className="links font-bold text-lg text-white hidden lg:flex space-x-5">
                  <NavLink className={"duration-500 hover:text-main"} to={""}>
                    Home{" "}
                  </NavLink>
                  <NavLink
                    className={"duration-500 hover:text-main"}
                    to={"products"}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    className={"duration-500 hover:text-main"}
                    to={"categories"}
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    className={"duration-500 hover:text-main"}
                    to={"brands"}
                  >
                    Brands
                  </NavLink>
                </div>
              )}
            <div className="flex px-1 items-center space-x-1">
              {userToken && (
                <div className="hidden lg:flex gap-4 px-2  py-2">
                  <NavLink
                    className={"text-[#fff] group hover:text-main duration-500"}
                    to={"wishlist"}
                  >
                    <div className="relative">
                      <i className="fas fa-heart text-lg"></i>
                      <div className="circle absolute -top-3 left-3 bg-white text-[#222] duration-500 group-hover:bg-main group-hover:text-white  font-bold text-sm p-[10px] w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                        {wishListData?.count || 0}
                      </div>
                    </div>
                  </NavLink>
                  <NavLink className={"text-[#fff] group hover:text-main duration-500"} to={"cart"}>
                    <div className="relative">
                      <i className="fa-solid fa-cart-shopping  cursor-pointer"></i>
                      <div className="circle absolute -top-3 left-3 bg-white   text-[#222] duration-500 group-hover:bg-main group-hover:text-white   font-bold text-sm p-[10px] w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                        {cart?.numOfCartItems || 0}
                      </div>
                    </div>
                  </NavLink>
                </div>
              )}
              {/* ################### Small Devices ###################  */}
              <div className=" cursor-pointer">
                <DropDown
                  userToken={userToken}
                  decoded={decoded}
                  logOut={logOut}
                  setUserToken={setUserToken}
                  cart = {cart}
                  setCart={setCart}
                  wishListData= {wishListData}
                  setWishListData={setWishListData}
                />
              </div>
              {/* ################### End Small Devices ###################  */}
              <div className="sign-box text-gray-800 hidden lg:flex space-x-2">
                {!userToken && (
                  <>
                    <NavLink
                      className={"duration-500 hover:text-main"}
                      to={"login"}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className={"duration-500 hover:text-main"}
                      to={"register"}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
              {/* ################### User Section ###################  */}
              <div className="settings ">
                <UserSection
                  userToken={userToken}
                  decoded={decoded}
                  logOut={logOut}
                  setUserToken={setUserToken}
                  setCart={setCart}
                  setWishListData={setWishListData}
                />
              </div>
              {/* ################### End User Section ###################  */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
