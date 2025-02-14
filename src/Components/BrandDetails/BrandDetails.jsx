import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function BrandDetails({ isClosed, setIsClosed, id }) {
  const [key, setKey] = useState("");

  async function getBrandDetails() {
    const response = await axios(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}/`
    );
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["brandDetails", id],
    queryFn: getBrandDetails,
    enabled: !!id,
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
        className={` duration-700 overflow-y-auto overflow-x-hidden bg-opacity-5 flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-lg ">
          {/* Modal content */}
          <div className="relative bg-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg ">
            {/* Modal header */}
            <div className="absolute right-6 top-6 flex items-center justify-between rounded-t  border-gray-200">
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
            <div className="p-4 md:p-5">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="box flex flex-col items-center space-y-2">
                  <div className="img">
                    <img src={data?.data.image} alt={data?.data.name} />
                  </div>
                  <p className="text-2xl font-bold hover:text-main duration-500 leading-relaxed text-white">
                    {data?.data.name}
                  </p>
                  <p className="text-lg font-semibold hover:text-main duration-500 leading-relaxed text-white">
                    {data?.data.slug}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
