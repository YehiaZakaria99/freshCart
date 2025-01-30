import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

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
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  }
  // GET Products
  async function getProductsCart() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );
      setCart(data);
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
      setCart(data);
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
      setCart(data);
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
          cart,
          updateCartProductQuantity,
          deleteProductFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
