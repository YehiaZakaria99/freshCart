import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function SubCategories({ isClosed, setIsClosed, id, categoryName}) {
  const [key, setKey] = useState("");

  async function getSubCategories() {
    const response = await axios(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["subCategories", id, categoryName],
    queryFn: getSubCategories,
    enabled: !!id && !!categoryName,
  });

  function keyDown(e) {
    setKey(e.key);
    if (key === "Escape") {
      setIsClosed(!isClosed);
    }
  }
  return (
    <>
      <div
        onClick={function (e) {
          if (e.target.id == "default-modal") {
            setIsClosed();
          }
        }}
        tabIndex={1}
        onKeyDown={keyDown}
        id="default-modal"
        className={`${
          !isClosed ? "hidden" : ""
        } duration-700 overflow-y-auto overflow-x-hidden bg-main bg-opacity-5 flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative text-white bg-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
              <h3 className="text-xl font-bold  ">
                {categoryName}
              </h3>
              <button
                onClick={() => setIsClosed()}
                type="button"
                className="text-white duration-500 bg-transparent  hover:text-main rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-8">
              {isLoading ? <Loading /> : data?.data.map((subCategory, index) => (
                <p key={index} className="text-lg hover:text-main duration-500 leading-relaxed ">
                  {subCategory.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
