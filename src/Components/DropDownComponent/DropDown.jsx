import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";

export default function DropDown({
  userToken,
  decoded,
  logOut,
  setUserToken,
  cart,
  setCart,
  wishListData,
  setWishListData,
}) {
  const navigate = useNavigate();
  return (
    <Menu as="div" className="lg:hidden">
      {({ close }) => (
        <>
          {/* Menu Toggle Button */}
          <MenuButton className="w-full justify-center rounded-md px-3 py-2 text-sm font-semibold ">
            <i className="fa-solid fa-bars text-main text-2xl"></i>
          </MenuButton>

          {/* Menu Content */}
          <Transition
            enter="transition duration-500 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-500 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems
              modal={false}
              className="absolute duration-500 left-0 z-10 w-full rounded-md bg-[#222] shadow-lg focus:outline-none"
            >
              <div className="py-2 duration-500">
                {/* User Section */}
                {userToken && (
                  <Menu as="div" className="relative">
                    {({ close: closeNested }) => (
                      <MenuItem>
                        <div className="relative">
                          <MenuButton className="flex items-center w-full px-4 py-2 text-sm ">
                            <span className="w-8 h-8 flex items-center justify-center p-3 rounded-full bg-white text-[#222]  group hover:bg-main hover:text-white duration-500">
                              <i className="fa-solid fa-user  text-sm "></i>
                            </span>
                          </MenuButton>

                          {/* Nested User Menu */}
                          <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <MenuItems
                              modal={false}
                              className="small-links relative left-0 ms-3 w-1/2  rounded-md bg-main text-[#222] shadow-lg px-3 py-3"
                            >
                              <MenuItem>
                          <p className="text-center text-xl font-bold duration-500 mb-3">
                            {decoded?.name}
                          </p>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/allorders"
                            onClick={() => {
                              close();
                              closeNested()
                            }}
                            className="block text-sm font-bold hover:text-white duration-500 mb-3"
                          >
                            Your Orders
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/userAddresses"
                            onClick={() => {
                              close();
                              closeNested()
                            }}
                            className="block text-sm font-bold hover:text-white duration-500 mb-3"
                          >
                            Your Addresses
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/updateprofile"
                            onClick={() => {
                              close();
                              closeNested()
                            }}
                            className="block text-sm font-bold hover:text-white duration-500 mb-3"
                          >
                            Update Profile
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/changepassword"
                            onClick={() => {
                              close();
                              closeNested()
                            }}
                            className="block text-sm font-bold hover:text-white duration-500 mb-3"
                          >
                            Update Password
                          </NavLink>
                        </MenuItem>
                            </MenuItems>
                          </Transition>
                        </div>
                      </MenuItem>
                    )}
                  </Menu>
                )}

                {/* Navigation Links */}
                {userToken && (
                  <>
                    <MenuItem>
                      <NavLink
                        to="/"
                        onClick={close}
                        className="block font-bold text-white hover:text-main duration-500 px-4 py-2 text-sm"
                      >
                        Home
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        to="/products"
                        onClick={close}
                        className="block font-bold text-white hover:text-main duration-500 px-4 py-2 text-sm"
                      >
                        Products
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        to="/categories"
                        onClick={close}
                        className="block font-bold text-white hover:text-main duration-500 px-4 py-2 text-sm"
                      >
                        Categories
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        to="/brands"
                        onClick={close}
                        className="block font-bold text-white hover:text-main duration-500 px-4 py-2 text-sm"
                      >
                        Brands
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <div className="lg:hidden flex gap-4 px-4 py-3">
                        <NavLink
                          className={
                            "text-[#fff] group hover:text-main duration-500"
                          }
                          to={"wishlist"}
                          onClick={close}
                        >
                          <div className="relative">
                            <i className="fas fa-heart text-lg"></i>
                            <div className="circle absolute -top-3 left-3 bg-white text-[#222] duration-500 group-hover:bg-main group-hover:text-white text-sm p-[10px] w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                              {wishListData?.count || 0}
                            </div>
                          </div>
                        </NavLink>
                        <NavLink className={"text-[#fff] group hover:text-main"} to={"cart"} onClick={close}>
                          <div className="relative">
                            <i className="fa-solid fa-cart-shopping duration-500  cursor-pointer"></i>
                            <div className="circle absolute -top-3 left-3 bg-white text-[#222] duration-500 group-hover:bg-main group-hover:text-white text-sm p-[10px] w-4 h-4 flex justify-center items-center  rounded-[50%] ">
                              {cart?.numOfCartItems || 0}
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    </MenuItem>
                  </>
                )}

                {/* Authentication */}
                <div
                  className={`${
                    userToken && "border-t"
                  } border-gray-300 mt-2 pt-2`}
                >
                  {userToken ? (
                    <MenuItem>
                      <button
                        onClick={() => {
                          logOut(
                            navigate,
                            setUserToken,
                            setCart,
                            setWishListData
                          );
                          close();
                        }}
                        className="w-full text-left block font-bold text-red-600 hover:text-red-800 duration-500 px-4 py-2 text-sm"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem>
                        <NavLink
                          to="/login"
                          onClick={close}
                          className="block font-bold text-blue-950 hover:text-main duration-500 px-4 py-2 text-sm"
                        >
                          Login
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          to="/register"
                          onClick={close}
                          className="block font-bold text-blue-950 hover:text-main duration-500 px-4 py-2 text-sm"
                        >
                          Register
                        </NavLink>
                      </MenuItem>
                    </>
                  )}
                </div>
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
