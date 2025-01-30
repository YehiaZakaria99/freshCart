import React, { useState } from "react";
import styles from "./CheckOut.module.css";
import Input from "../Register/Input/Input";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";

export default function CheckOut() {
  const token = localStorage.getItem("userToken");
  const headers = {
    token
  };
  const decoded = jwtDecode(token);
  
  const [shippingAddress, setShippingAddress] = useState({});

  function getUserData(values) {
    setShippingAddress(values);
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: getUserData,
  });

  async function checkOutSession() {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${decoded.id}?url=http://localhost:5173`,
      {
        shippingAddress
      },
      {
        headers
      }
    );
    console.log(data);
  }

  return (
    <>
      <div className="container">
        <div className="box md:w-custom-width w-full mx-auto py-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h3 className="text-center text-xl mb-6">Check Out</h3>
          <div className="form-box">
            <form action="" onSubmit={formik.handleSubmit}>
              <Input
                formik={formik}
                id="details"
                type="text"
                placeholder=" details"
                name="details"
              />
              <Input
                formik={formik}
                id="phone"
                type="tel"
                placeholder=" phone"
                name="phone"
              />
              <Input
                formik={formik}
                id="city"
                type="text"
                placeholder=" city"
                name="city"
              />
              <div className="md:w-custom-width w-full mx-auto text-end">
                <button
                  className="bg-main text-light py-1 px-4 rounded-lg font-semibold"
                  type="submit"
                  onClick={()=>checkOutSession()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
