import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import test from "../../assets/images/test.jpeg";
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
        <section className="categories">
          <div className="container">
            <div className="row flex flex-wrap gap-y-6 py-6 justify-center">
              {data?.data?.map((category, index) => (
                <div
                  className="box w-full md:w-1/2 lg:w-1/4 min-w-[220px]"
                  key={index}
                >
                  <div className="px-4">
                    <div
                      onClick={() => getCategoryId(category._id, category.name)}
                      className="block w-full shadow-[0_0_4px_rgba(0,0,0,0.25)] group rounded-md duration-500 overflow-hidden hover:shadow-main"
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

/* 



<!-- Modal toggle -->
<button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button>

<!-- Main modal -->




*/
