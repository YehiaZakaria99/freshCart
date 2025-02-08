import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./../Loading/Loading";
import BrandDetails from "../BrandDetails/BrandDetails";

export default function Brands() {
  const [brandId, setBrandId] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  // const [categoryName, setCategoryName] = useState("");
  async function getBrands() {
    let response = await axios(
      `https://ecommerce.routemisr.com/api/v1/brands/?limit=50`
    );
    return response.data;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  // Handle category click
  function getBrandId(brandId) {
    setBrandId(brandId); // Update category ID
    setIsClosed(true); // Open the modal
  }

  // Handle modal close
  function handleClose() {
    setIsClosed(false);
    setCategoryId(""); // Reset category ID when closing
  }

  return (
    <>
      {!isLoading ? (
        <section className="brands py-20">
          <div className="container">
            <div className="row flex flex-wrap gap-y-6 py-6 justify-center">
              {data?.data?.map((brand, index) => (
                <div
                  className="box w-full md:w-1/2 lg:w-1/4 min-w-[220px]"
                  key={index}
                >
                  <div className="px-4">
                    <div
                      onClick={() => getBrandId(brand._id, brand.name)}
                      className="block w-full shadow-[0_0_4px_rgba(0,0,0,0.25)] group rounded-md duration-500 overflow-hidden hover:shadow-main"
                    >
                      <div className="img overflow-hidden h-[300px]">
                        <img
                          className="object-contain w-full h-full  object-center"
                          src={brand.image}
                          alt={brand.name}
                        />
                      </div>
                      <h3 className="py-3 text-center text-rgba(0,0,0,0.25) duration-500 group-hover:text-main text-xl font-bold">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ############################################ MODAL ############################################ */}
          {
            <BrandDetails
              isClosed={isClosed}
              setIsClosed={handleClose}
              id={brandId}
            />
          }
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
