import React, { useState } from "react";
import styles from "./Products.module.css";
import RecentProducts from "./../RecentProducts/RecentProducts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products using react-query
  async function getProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = data?.data?.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="products">
        <div className="container">
          <div className="box py-6 md:w-4/5 w-full mx-auto">
            <div className="input-box md:w-4/5 w-full mx-auto ">
              <input
                onInput={(e) => setSearchQuery(e.target.value)}
                className=" outline-none shadow-[0_0px_3px_rgba(0,0,0,0.25)] focus:shadow-main  px-3 py-1 block w-full rounded-md text-lg"
                type="text"
                placeholder="search...."
              />
            </div>
            <RecentProducts products={filteredProducts} />
          </div>
        </div>
      </section>
    </>
  );
}
