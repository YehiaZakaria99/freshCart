import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});

  const headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        { headers }
      );
      setCart(data);
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  }

  return (
    <>
      <CartContext.Provider value={{ addProductToCart, cart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
