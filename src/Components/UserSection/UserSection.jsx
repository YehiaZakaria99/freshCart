import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";

export default function UserSection({
  userToken,
  decoded,
  logOut,
  setUserToken,
  setCart,
  setWishListData,
}) {
  const navigate = useNavigate();
  return (
    <Menu as="div" className="hidden lg:block">
      <>
        <div className="">
          {/* User Section */}
          {userToken && (
            <Menu as="div" className="relative">
              {({ close }) => (
                <MenuItem>
                  <div className="relative">
                    <MenuButton className="flex items-center w-full px-4  text-sm ">
                      <span className="w-8 h-8 flex items-center justify-center px-3 rounded-full bg-white  group hover:bg-main duration-500">
                        <i className="fa-solid fa-user text-[#222] group-hover:text-[#fff] text-sm duration-500"></i>
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
                        className="absolute right-0 z-10 mt-2 w-56 text-blue-950  rounded-md bg-white  shadow-lg  focus:outline-hidden px-3 py-3 duration-500 "
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
                            }}
                            className="block text-sm font-bold hover:text-main duration-500 mb-3"
                          >
                            Your Orders
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/userAddresses"
                            onClick={() => {
                              close();
                            }}
                            className="block text-sm font-bold hover:text-main duration-500 mb-3"
                          >
                            Your Addresses
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/updateprofile"
                            onClick={() => {
                              close();
                            }}
                            className="block text-sm font-bold hover:text-main duration-500 mb-3"
                          >
                            Update Profile
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/changepassword"
                            onClick={() => {
                              close();
                            }}
                            className="block text-sm font-bold hover:text-main duration-500 mb-3"
                          >
                            Update Password
                          </NavLink>
                        </MenuItem>
                        
                        <MenuItem>
                          {/* Authentication */}
                          <div
                            className={`${
                              userToken && "border-t"
                            } border-gray-300 mt-2 pt-2`}
                          >
                            {userToken && (
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
                                  className="w-full text-left block font-bold text-red-600 hover:text-red-800 duration-500 py-2 text-sm"
                                >
                                  Logout
                                </button>
                              </MenuItem>
                            )}
                          </div>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </div>
                </MenuItem>
              )}
            </Menu>
          )}
        </div>
      </>
    </Menu>
  );
}

/* 
  
  
  
  */
