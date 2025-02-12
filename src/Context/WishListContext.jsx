import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
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
      
      toast.success(data?.message,{
        position: 'center'
      });
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
      toast.success("deleted successfully from wishlist",{
        position: 'center'
      });
      getUserWishList();
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserWishList() {
    try {
      // setIsLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      // setIsLoading(false);
      setWishListData(data);
    } catch (error) {
      // setIsLoading(true);
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
      value={{isLoading, getUserWishList , wishListData, setWishListData,addProductToWishList, deleteProductFromWishList }}
    >
      {children}
    </wishListContext.Provider>
  );
}