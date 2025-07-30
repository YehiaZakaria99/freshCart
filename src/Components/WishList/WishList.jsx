import React, { useContext, useState } from "react";
import styles from "./WishList.module.css";
import Loading from "../Loading/Loading";
import { wishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart, Trash } from "lucide-react";

export default function WishList() {
  const { isLoading, wishListData, deleteProductFromWishList } =
    useContext(wishListContext);
  const { addProductToCart } = useContext(CartContext);
  return (
    <>
      {/* {!isLoading ? ( */}
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 my-20 px-10">
          <h1 className="text-3xl font-bold gap-3 py-3 justify-center items-center mb-6 flex">
            <i className="fa-regular fa-heart fa-2x"></i>
            <span className="">My Wishlist</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            {wishListData?.data?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center bg-white shadow-md rounded-lg p-4 relative"
              >
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{item.price} EGP</p>
                  <button
                    onClick={() => addProductToCart(item.id)}
                    className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
                <button
                  onClick={() => deleteProductFromWishList(item.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </>
      {/* ) : (
        <Loading />
      )} */}
    </>
  );
}

/* 


*/

/* 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Woman Standart Fit Knitted Cardigan",
      price: "499 EGP",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Woman Shawl",
      price: "191 EGP",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        <i className="fa-regular fa-heart fa-4x"></i>
         My Wishlist
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {wishListData?.data?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center bg-white shadow-md rounded-lg p-4 relative"
          >
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.price} EGP</p>
              <button 
              onClick={() => addProductToCart(item.id)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
            <button
              onClick={() => deleteProductFromWishList(item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;






*/
