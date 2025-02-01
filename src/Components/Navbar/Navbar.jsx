import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import freshcartLogo from "../../assets/images/navbar/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  const { cart, setCart  } = useContext(CartContext);
  const {  setWishListData } = useContext(wishListContext);

  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken("");
    navigate("login");
    setCart(null);
    setWishListData(null)
  }

  // console.log(loc.pathname);

  return (
    <>
      <nav className="py-3 bg-gray-200">
        <div className="container">
          <div className="box flex justify-between">
            <div className="flex items-center space-x-2">
              <NavLink to={""}>
                <img className="w-32" src={freshcartLogo} alt="freshcartLogo" />
              </NavLink>
              {userToken && (
                <div className="links text-gray-500 hidden lg:flex space-x-2">
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
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`icons-box hidden lg:flex space-x-2 text-gray-500`}
              >
                {userToken && (<>
                  <NavLink to={"wishlist"}>
                    WishList
                  </NavLink>
                  <NavLink to={"cart"}>
                    <div className="me-3 relative">
                      <i className="fa-solid fa-cart-shopping duration-500 hover:text-main cursor-pointer"></i>
                      <div className="circle absolute -top-2 left-3 bg-main text-light text-sm p-2 w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                        {cart?.numOfCartItems}
                      </div>
                    </div>
                  </NavLink>
                  </>
                )}
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://instagram.com"}
                >
                  {" "}
                  <i className="fa-brands fa-instagram"></i>{" "}
                </Link>
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://facebook.com"}
                >
                  {" "}
                  <i className="fa-brands fa-facebook"></i>{" "}
                </Link>
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://tiktok.com"}
                >
                  {" "}
                  <i className="fa-brands fa-tiktok"></i>{" "}
                </Link>
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://x.com"}
                >
                  {" "}
                  <i className="fa-brands fa-x-twitter"></i>{" "}
                </Link>
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://linkedin.com"}
                >
                  {" "}
                  <i className="fa-brands fa-linkedin"></i>{" "}
                </Link>
                <Link
                  className="duration-300 hover:text-main"
                  target="_blank"
                  to={"https://youtube.com"}
                >
                  {" "}
                  <i className="fa-brands fa-youtube"></i>{" "}
                </Link>
              </div>
              <div className="toggle-menu relative">
                <button
                  className="lg:hidden"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <i className="fa-solid fa-bars text-gray-700 text-2xl"></i>
                </button>
                <div
                  className={`z-50 rounded-md links-mobile absolute right-0 top-0 bg-light py-6 px-8 space-y-5 ${
                    isOpen ? "lg:hidden" : "hidden"
                  }`}
                >
                  <button
                    className="absolute right-3 top-2"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                  {userToken && (
                    <div className="links space-y-3 py-2 text-gray-500 lg-hidden flex flex-col">
                      <NavLink
                        className={"duration-500 hover:text-main"}
                        to={""}
                      >
                        Home
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
                  <div
                    className={`icons-box lg-hidden flex flex-col space-y-3 text-gray-500`}
                  >
                    {userToken && (<>
                      <NavLink to={"wishlist"}>
                        WishList
                      </NavLink>
                      <NavLink to={"cart"}>
                        <div className="relative">
                          <i className="fa-solid fa-cart-shopping duration-500 hover:text-main cursor-pointer"></i>
                          <div className="circle absolute -top-3 left-3 bg-main text-light text-sm p-2 w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                            {cart?.numOfCartItems}
                          </div>
                        </div>
                      </NavLink>
                      </>
                    )}
                    <div className="flex space-x-3">
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://instagram.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-instagram"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://facebook.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-facebook"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://tiktok.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-tiktok"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://x.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-x-twitter"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://linkedin.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-linkedin"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://youtube.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-youtube"></i>{" "}
                      </Link>
                    </div>
                  </div>
                  <div className="sign-box text-gray-500 lg-hidden space-y-2 flex flex-col">
                    {userToken ? (
                      <span
                        className="duration-500 hover:text-main cursor-pointer"
                        onClick={() => logOut()}
                      >
                        Logout
                      </span>
                    ) : (
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
                </div>
              </div>
              <div className="sign-box text-gray-500 hidden lg:flex space-x-2">
                {userToken ? (
                  <span
                    className="duration-500 hover:text-main cursor-pointer"
                    onClick={() => logOut()}
                  >
                    Logout
                  </span>
                ) : (
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
