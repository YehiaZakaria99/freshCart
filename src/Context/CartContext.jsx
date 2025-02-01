import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState("");

  const getToken = () => localStorage.getItem("userToken");
  // GET Products
  async function getProductsCart() {
    try {
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      setCart(data);
    } catch (error) {
      setCart(null)
      console.log(error);
    }
  }
  useEffect(() => {
    if (getToken()) {
      getProductsCart();
    } else {
      setCart(null); // Clear cart if no user is logged in
    }
  }, [getToken()]);

  // ADD Product To Carts
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers: {
            token: getToken(),
          },
        }
      );
      getProductsCart();
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(data?.message);
    }
  }

  // Update Count
  async function updateCartProductQuantity(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: {
            token: getToken(),
          },
        }
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
          headers: {
            token: getToken(),
          },
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
          setCart,
          updateCartProductQuantity,
          deleteProductFromCart,
          getProductsCart
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
