import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { wishListContext } from "../../Context/WishListContext";

export default function RecentProducts({ products }) {
  const { addProductToCart } = useContext(CartContext);
  const { wishListData, addProductToWishList, deleteProductFromWishList } =
    useContext(wishListContext);

  const [recentProducts, setRecentProducts] = useState([]);
  // Access the client
  async function getProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  // Queries
  let { data, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setRecentProducts(data.data.data);
    }
    if (products) {
      setRecentProducts(products);
    }
  }, [data, products]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="box py-3 ">
            <section className="products mx-auto flex flex-wrap gap-y-6 py-6 justify-center ">
              {recentProducts.map((product, index) => {
                const isFavourite = wishListData?.data?.some(
                  (item) => item.id === product.id
                );
                return (
                  <div
                    className="mx-auto relative group w-full md:w-1/2 lg:w-1/2 xl:w-1/4 min-w-[220px] text-[#222222] "
                    key={index}
                  >
                    <div className=" px-4 ">
                      <div className="block w-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[#222] duration-500 group rounded-md overflow-hidden">
                        <Link to={`/productdetails/${product.id}`}>
                          <img
                            className="h-[300px] w-full object-cover"
                            src={product.imageCover}
                            alt={product.title}
                          />
                          <div className="py-3 px-3 text-center text-rgba(0,0,0,0.25) duration-500 group-hover:text-main text-lg font-bold">
                            <h4 className="text-sm">{product.category.name}</h4>
                            <h3>{product.title.split(" ", 2).join(" ")}</h3>
                            <div className="flex justify-between text-sm">
                              <p>{product.price} EGP</p>
                              <p>
                                <i className="fas fa-star "></i>
                                {product.ratingsQuantity}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="px-3 py-2 flex justify-center gap-6">
                          <div className="">
                            <button
                              onClick={() => addProductToCart(product.id)}
                              className="text-center group-hover:text-main duration-500 rounded-md font-bold"
                            >
                              <i className="fa-solid fa-cart-shopping cursor-pointer text-2xl "></i>
                            </button>
                          </div>
                          <div className="">
                            {isFavourite ? (
                              <button
                                onClick={() =>
                                  deleteProductFromWishList(product.id)
                                }
                              >
                                <i className="fa-solid fa-heart  text-2xl cursor-pointer group-hover:text-main duration-500 "></i>
                              </button>
                            ) : (
                              <button
                                onClick={() => addProductToWishList(product.id)}
                              >
                                <i className="fa-regular fa-heart text-2xl cursor-pointer duration-500 group-hover:text-main"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      )}
    </>
  );
}
