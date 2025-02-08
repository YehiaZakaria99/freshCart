// import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Input from "../../Register/Input/Input";
import TextArea from "./../../TextArea/TextArea";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function AddAddress({ setAddresses, setIsClosed }) {
  const [isLoading, setIsLoading] = useState(false);

  async function addAddress(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setIsLoading(false);
      toast.success(data.message, {
        position: "center",
      });
      setIsClosed(true);
      console.log(data.data);
      setAddresses(data.data);
      values.name = "";
      values.details = "";
      values.phone = "";
      values.city = "";
    } catch (err) {
      setIsClosed(false);
      setIsLoading(true);
      toast.error(data.message, {
        position: "center",
      });
      console.log(err);
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    phone: yup.string().required("phone is required"),
    city: yup.string().required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: addAddress,
  });

  return (
    <>
      <div
        id="default-modal"
        className={`my-10 duration-700 overflow-y-auto overflow-x-hidden bg-main bg-opacity-5 flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-lg shadow-[0_0_10px] shadow-main rounded-md">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm ">
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <h2 className="mb-5 font-bold">Enter Your Address</h2>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  id="name"
                  placeholder="name"
                  name="name"
                  formik={formik}
                  error={formik.errors.name}
                ></Input>
                <TextArea
                  id="details"
                  name="details"
                  placeholder="details"
                  formik={formik}
                />
                <Input
                  id="phone"
                  placeholder="phone"
                  name="phone"
                  formik={formik}
                  error={formik.errors.phone}
                ></Input>
                <Input
                  id="city"
                  placeholder="city"
                  name="city"
                  formik={formik}
                  error={formik.errors.city}
                ></Input>
                <div className=" py-3 flex justify-end rounded-t border-gray-200">
                  {isLoading ? (
                    <button
                      type="submit"
                      className="bg-main text-light me-3 py-1 px-2 rounded-md disabled:bg-green-400 "
                      disabled
                    >
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white duration-500 me-3 bg-main rounded-md text-md px-4 py-1  inline-flex justify-center items-center"
                      data-modal-hide="default-modal"
                    >
                      ADD
                    </button>
                  )}
                  <button
                    onClick={() => setIsClosed(true)}
                    type="button"
                    className="text-white duration-500 me-3 bg-red-700 rounded-md text-md px-4 py-1 inline-flex justify-center items-center"
                    data-modal-hide="default-modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
