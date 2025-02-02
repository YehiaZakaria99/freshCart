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
    if (products){
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
            <section className="products mx-auto flex flex-wrap gap-y-4 py-8 justify-center">
              {recentProducts.map((product, index) => {
                const isFavourite = wishListData?.some(
                  (item) => item.id === product.id
                );
                return (
                  <div
                    className="mx-auto relative group min-w-[200px] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-1"
                    key={index}
                  >
                    <div className="rounded-md duration-300 shadow-[0_0px_2px_rgba(0,0,0,0.25)] hover:shadow-main  hover:scale-105 overflow-hidden px-5 py-2">
                      <Link to={`/productdetails/${product.id}`}>
                        <img
                          className=""
                          src={product.imageCover}
                          alt={product.title}
                        />
                        <h4 className="text-main text-sm">
                          {product.category.name}
                        </h4>
                        <h3>{product.title.split(" ", 2).join(" ")}</h3>
                        <div className="flex justify-between">
                          <p>{product.price} EGP</p>
                          <p>
                            <i className="fas fa-star text-yellow-400"></i>
                            {product.ratingsQuantity}
                          </p>
                        </div>
                      </Link>
                      <div className="btn py-2 opacity-0 duration-500 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 ">
                        <button
                          onClick={() => addProductToCart(product.id)}
                          className="text-center bg-main text-light w-full py-2 rounded-md font-bold"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="absolute right-3 top-3  ">
                        {isFavourite ? (
                          <button
                            onClick={() =>
                              deleteProductFromWishList(product.id)
                            }
                          >
                            <i className="opacity-0 duration-500 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 fa-solid fa-heart fa-lg text-red-600"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => addProductToWishList(product.id)}
                          >
                            <i className="opacity-0 duration-500 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 fa-regular fa-heart fa-lg hover:text-red-600"></i>
                          </button>
                        )}
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
