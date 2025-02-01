import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishListData, setWishListData] = useState([]);
  const getToken = () => localStorage.getItem("userToken");

  async function addProductToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers: {
            token: getToken(),
          },
        }
      );
      toast.success(data?.message);
      getUserWishList();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProductFromWishList(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      toast.success("deleted successfully");
      getUserWishList();
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserWishList() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      setWishListData(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (getToken()) {
      getUserWishList();
    } else {
      setWishListData(null); // Clear cart if no user is logged in
    }
  }, [getToken()]);

  return (
    <wishListContext.Provider
      value={{getUserWishList , wishListData, setWishListData,addProductToWishList, deleteProductFromWishList }}
    >
      {children}
    </wishListContext.Provider>
  );
}