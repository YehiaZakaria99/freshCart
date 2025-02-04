import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import freshcartLogo from "../../assets/images/navbar/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  const { cart, setCart } = useContext(CartContext);
  const { setWishListData } = useContext(wishListContext);

  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userIcon, setUserIcon] = useState(false);
  let [decoded, setDecoded] = useState("");
  const buttonRef = useRef(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setUserIcon(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken("");
    setUserIcon(false);
    navigate("login");
    setCart(null);
    setWishListData(null);
  }

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      setDecoded(jwtDecode(JSON.stringify(userToken)));
    }
  }, [userToken]);

  return (
    <>
      <nav className="py-5 bg-gray-200 fixed z-[99999] w-full">
        <div className="container">
          <div className="box flex justify-between flex-wrap items-center gap-y-3 ">
            <div className="flex items-center space-x-2">
              <NavLink to={""}>
                <img className="w-32" src={freshcartLogo} alt="freshcartLogo" />
              </NavLink>
              {userToken && (
                <div className="links text-gray-800 hidden lg:flex space-x-2">
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
                  <NavLink
                    className={"duration-500 hover:text-main"}
                    to={"allorders"}
                  >
                    Orders
                  </NavLink>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {userToken && (
                <>
                  <NavLink
                    className={"text-gray-800 hover:text-main duration-500"}
                    to={"wishlist"}
                  >
                    WishList
                  </NavLink>
                  <NavLink to={"cart"}>
                    <div className="me-3 relative">
                      <i className="fa-solid fa-cart-shopping duration-500 text-gray-800 hover:text-main cursor-pointer"></i>
                      <div className="circle absolute -top-2 left-3 bg-main text-light text-sm p-2 w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                        {cart?.numOfCartItems || 0}
                      </div>
                    </div>
                  </NavLink>
                </>
              )}
              {/* ################### Small Devices ###################  */}
              <div className="toggle-menu relative">
                <button
                  className="lg:hidden"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <i className="fa-solid fa-bars text-gray-800 text-2xl"></i>
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
                    <div className="links space-y-3 py-2 text-gray-800 lg-hidden flex flex-col">
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
                  {userToken && (
                    <>
                      <NavLink to={"wishlist"}>WishList</NavLink>
                      <NavLink to={"cart"}>
                        <div className="relative">
                          <i className="fa-solid fa-cart-shopping duration-500 hover:text-main cursor-pointer"></i>
                          <div className="circle absolute -top-3 left-3 bg-main text-light text-sm p-2 w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                            {cart?.numOfCartItems || 0}
                          </div>
                        </div>
                      </NavLink>
                    </>
                  )}

                  <div className="sign-box text-gray-800 lg-hidden space-y-2 flex flex-col">
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
              <div className="settings relative">
                {userToken && (
                  <>
                    <div className="hidden lg:block">
                      <button
                        ref={buttonRef}
                        onClick={(event) => {
                          event.stopPropagation();
                          setUserIcon((prev) => !prev);
                        }}
                      >
                        <span className="w-8 h-8 flex items-center justify-center p-3 rounded-[50%] bg-main group hover:bg-white duration-500">
                          <i className="fa-solid fa-user text-white text-sm duration-500 group-hover:text-main"></i>
                        </span>
                      </button>
                    </div>
                    {/* Dropdown menu */}
                    <div
                      id="dropdownBottom"
                      ref={dropdownRef}
                      className={`${
                        !userIcon && "hidden"
                      } z-10 absolute right-0 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow-[0_0_5px_rgba(0,0,0,.25)] w-44 dark:bg-gray-700`}
                      onBlur={() => setUserIcon(false)}
                      tabIndex={0}
                    >
                      <ul
                        className="py-2 text-sm text-gray-800 font-semibold dark:text-gray-200 space-y-3"
                        aria-labelledby="dropdownBottomButton"
                      >
                        {/* <li className="px-4 duration-500 hover:text-main cursor-pointer">
                          <p className="text-lg text-center font-bold">
                            {decoded.name}
                          </p>
                        </li> */}
                        <li className="px-4 duration-500 hover:text-main cursor-pointer">
                          <NavLink
                            onClick={() => setUserIcon(false)}
                            to={"/updateprofile"}
                          >
                            Update Profile
                          </NavLink>
                        </li>
                        <li className="px-4 duration-500 hover:text-main cursor-pointer">
                          <NavLink
                            onClick={() => setUserIcon(false)}
                            to={"/updateaddress"}
                          >
                            Update Address
                          </NavLink>
                        </li>
                        <li className="px-4 duration-500 hover:text-main cursor-pointer">
                          <NavLink
                            onClick={() => setUserIcon(false)}
                            to={"/changepassword"}
                          >
                            Change Password
                          </NavLink>
                        </li>
                        <li
                          className="px-4 duration-500 hover:text-main cursor-pointer"
                          onClick={() => logOut()}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
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
