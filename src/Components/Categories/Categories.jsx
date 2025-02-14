import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "./../Loading/Loading";
import SubCategories from "./../SubCategories/SubCategories";

export default function Categories() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  async function getCategories() {
    let response = await axios(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    return response.data;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Handle category click
  function getCategoryId(categoryId, categoryName) {
    setCategoryId(categoryId); // Update category ID
    setCategoryName(categoryName);
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
        <section className="categories py-20  ">
          <div className="container">
            <div className="row flex flex-wrap gap-y-6 py-6 justify-center">
              {data?.data?.map((category, index) => (
                <div
                  className="box w-full md:w-1/2 lg:w-1/4 min-w-[220px] text-[#222222]"
                  key={index}
                >
                  <div className="px-4">
                    <div
                      onClick={() => getCategoryId(category._id, category.name)}
                      className="block w-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[#222] duration-500 group rounded-md overflow-hidden "
                    >
                      <div className="img overflow-hidden h-[300px]">
                        <img
                          className="object-cover w-full h-full  object-center"
                          src={category.image}
                          alt={category.name}
                        />
                      </div>
                      <h3 className="py-3 text-center text-rgba(0,0,0,0.25) duration-500 group-hover:text-main text-xl font-bold">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ############################################ MODAL ############################################ */}
          {
            <SubCategories
              isClosed={isClosed}
              setIsClosed={handleClose}
              id={categoryId}
              categoryName={categoryName}
            />
          }
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
