import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [productsCart, setProductsCart] = useState("");

  const headers = {
    token: localStorage.getItem("userToken"),
  };
  // ADD Product To Carts
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        { headers }
      );
      getProductsCart();
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  }
  // GET Products
  async function getProductsCart() {
    try {
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );
      setProductsCart(data);
      //   console.log(data.numOfCartItems);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductsCart();
  }, []);

  // Update Count
  async function updateCartProductQuantity(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        { headers }
      );
      setProductsCart(data);
      toast.success("success");
    } catch (error) {
      toast.error("error");
    }
  }

  // Delete Product From Carts
  async function deleteProductFromCart(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      setProductsCart(data);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          productsCart,
          updateCartProductQuantity,
          deleteProductFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
