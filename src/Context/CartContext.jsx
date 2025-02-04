import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => localStorage.getItem("userToken");
  // GET Products
  async function getProductsCart() {
    try {
      setIsLoading(true);
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      setIsLoading(false);
      setCart(data);
    } catch (error) {
      setIsLoading(true);
      setCart(null);
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
      toast.success(data?.message, {
        position: "center",
      });
    } catch (error) {
      console.log(error);
      toast.error(data?.message, {
        position: "center",
      });
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
      toast.success("success", {
        position: "center",
      });
    } catch (error) {
      toast.error("error", {
        position: "center",
      });
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
      toast.success("Product Deleted Successfully", {
        position: "center",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Clear Cart
  async function clearCart() {
    try {
      setIsLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: getToken(),
          },
        }
      );
      console.log(data);
      setIsLoading(false);
      setCart(data);
      toast.success("Deleted Successfully", {
        position: "center",
      });
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
          getProductsCart,
          clearCart,
          isLoading
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
