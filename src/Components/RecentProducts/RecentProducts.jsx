import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { wishListContext } from "../../Context/WishListContext";
import ProductCard from "./../ProductCard/ProductCard";

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
                    <ProductCard
                      product={product}
                      isFavourite={isFavourite}
                      addProductToCart={addProductToCart}
                      addProductToWishList={addProductToWishList}
                      deleteProductFromWishList={deleteProductFromWishList}
                    />
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
