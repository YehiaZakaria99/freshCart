import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import freshcartLogo from "../../assets/images/navbar/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Navbar() {
  let {userToken, setUserToken} = useContext(userContext)
  // console.log(userToken);
  
  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  function logOut(){
    localStorage.removeItem("userToken");
    setUserToken("");
    navigate("login")
  }
  return (
    <>
      <nav className="py-3 bg-gray-200">
        <div className="container">
          <div className="box flex justify-between">
            <div className="flex items-center space-x-2">
              <NavLink to={""}>
                <img className="w-32" src={freshcartLogo} alt="freshcartLogo" />
              </NavLink>
              {
                userToken && 
              <div className="links text-gray-500 hidden lg:flex space-x-2">
                <NavLink to={"home"}>Home  </NavLink>
                <NavLink to={"cart"}>Cart</NavLink>
                <NavLink to={"products"}>Products</NavLink>
                <NavLink to={"categories"}>Categories</NavLink>
                <NavLink to={"brands"}>Brands</NavLink>
              </div>
              }
            </div>
            <div className="flex items-center space-x-2">
              <div className={`icons-box hidden lg:flex space-x-2`}>
                <Link target="_blank" to={"https://instagram.com"}> <i className="fa-brands fa-instagram"></i> </Link>
                <Link target="_blank" to={"https://facebook.com"}> <i className="fa-brands fa-facebook"></i> </Link>
                <Link target="_blank" to={"https://tiktok.com"}> <i className="fa-brands fa-tiktok"></i> </Link>
                <Link target="_blank" to={"https://x.com"}> <i className="fa-brands fa-x-twitter"></i> </Link>
                <Link target="_blank" to={"https://linkedin.com"}> <i className="fa-brands fa-linkedin"></i> </Link>
                <Link target="_blank" to={"https://youtube.com"}> <i className="fa-brands fa-youtube"></i> </Link>
              </div>
              <div className="toggle-menu relative">
                <button className="lg:hidden" onClick={()=>{setIsOpen(true)}}>
                  <i className="fa-solid fa-bars text-gray-700 text-2xl"></i>
                </button>
                <div className={`z-50 rounded-md links-mobile absolute right-0 top-0 bg-light py-6 px-8 space-y-5 ${isOpen ? 'lg:hidden' : 'hidden'}`}>
                  <button className="absolute right-3 top-2" onClick={()=>{setIsOpen(false)}}>
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                  {
                    userToken &&
                  <div className="links space-y-3 py-2 text-gray-500 lg-hidden flex flex-col">
                    <NavLink to={"home"}>Home</NavLink>
                    <NavLink to={"cart"}>Cart</NavLink>
                    <NavLink to={"products"}>Products</NavLink>
                    <NavLink to={"categories"}>Categories</NavLink>
                    <NavLink to={"brands"}>Brands</NavLink>
                  </div>
                  }
                  <div className={`icons-box lg-hidden space-x-3 flex`}>
                    <Link target="_blank" to={"https://instagram.com"}> <i className="fa-brands fa-instagram"></i> </Link>
                    <Link target="_blank" to={"https://facebook.com"}> <i className="fa-brands fa-facebook"></i> </Link>
                    <Link target="_blank" to={"https://tiktok.com"}> <i className="fa-brands fa-tiktok"></i> </Link>
                    <Link target="_blank" to={"https://x.com"}> <i className="fa-brands fa-x-twitter"></i> </Link>
                    <Link target="_blank" to={"https://linkedin.com"}> <i className="fa-brands fa-linkedin"></i> </Link>
                    <Link target="_blank" to={"https://youtube.com"}> <i className="fa-brands fa-youtube"></i> </Link>
                  </div>
                  <div className="sign-box text-gray-500 lg-hidden space-y-3 flex flex-col">
                    {userToken ? <span className="cursor-pointer" onClick={()=> logOut()}>Logout</span>
                  :
                  <>
                    <NavLink to={"login"}>Login</NavLink>
                    <NavLink to={""}>Register</NavLink>
                  </>
                }
                    </div>
                </div>
              </div>
              <div className="sign-box text-gray-500 hidden lg:flex space-x-2">
              {userToken ? <span className="cursor-pointer" onClick={()=> logOut()}>Logout</span>
                  :
                  <>
                    <NavLink to={"login"}>Login</NavLink>
                    <NavLink to={""}>Register</NavLink>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
