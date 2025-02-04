import React, { useContext, useState } from "react";
import styles from "./CheckOut.module.css";
import Input from "../Register/Input/Input";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { CartContext } from "./../../Context/CartContext";
import * as yup from "yup";

export default function CheckOut() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useContext(CartContext);

  async function handleCheckOut(shippingAddress) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://fresh-cart-six-theta.vercel.app/`,
        {
          shippingAddress,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setIsLoading(false);
      console.log(data.session.url);
      location.href = data.session.url;
    } catch (err) {
      console.log(err);
      // setApiError(err.response.data.message);
      setIsLoading(true);
    }
  }

  const validationSchema = yup.object({
    details: yup.string().required("details are required"),
    phone: yup.string().required("phone is required"),
    city: yup.string().required("city is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleCheckOut,
  });

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="box md:w-custom-width w-full mx-auto">
            <h3 className="text-center text-xl mb-6">Check Out</h3>
            <div className="form-box">
              <form action="" onSubmit={formik.handleSubmit}>
                <Input
                  formik={formik}
                  error={formik.errors.details}
                  id="details"
                  type="text"
                  placeholder=" details"
                  name="details"
                />
                <Input
                  formik={formik}
                  error={formik.errors.phone}
                  id="phone"
                  type="tel"
                  placeholder=" phone"
                  name="phone"
                />
                <Input
                  formik={formik}
                  error={formik.errors.city}
                  id="city"
                  type="text"
                  placeholder=" city"
                  name="city"
                />
                <div className="md:w-custom-width w-full mx-auto text-end">
                  {isLoading ? (
                    <button
                      type="submit"
                      className="bg-main text-light py-1 px-2 rounded-md disabled:bg-green-400 "
                      disabled
                    >
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      className="bg-main text-light py-1 px-4 rounded-lg font-semibold"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
