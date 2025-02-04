import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import styles from "./Register.module.css";
import axios from "axios";
import Input from "./Input/Input";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { setUserToken } = useContext(userContext);
  let { getProductsCart } = useContext(CartContext);
  let { getUserWishList } = useContext(wishListContext);

  let navigate = useNavigate();

  async function register(values) {
    try {
      setIsLoading(true);
      let {
        data: { token },
      } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      localStorage.setItem("userToken", token);
      await getProductsCart();
      await getUserWishList();
      navigate("/");
      setUserToken(token);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setApiError(message);
      setIsLoading(false);
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required("name is required").min(3).max(10),
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z]\w{4,8}$/, "ex: Ahmed123"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "password isn't match"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyptian number "),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="box md:w-custom-width w-full ">
          <h3 className="text-2xl md:w-custom-width w-full mx-auto mb-4">
            Register Now :
          </h3>
          <div className="form ">
            <form className="" onSubmit={formik.handleSubmit}>
              {apiError && (
                <div
                  className={`md:w-custom-width mx-auto text-center text-xlg w-full p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
                  role="alert"
                >
                  <span className="font-medium">{apiError}</span>
                </div>
              )}
              <Input
                formik={formik}
                type="text"
                id="name"
                placeholder="name:"
                name="name"
                error={formik.errors.name}
              />
              <Input
                formik={formik}
                type="email"
                id="email"
                placeholder="email:"
                name="email"
                error={formik.errors.email}
              />
              <Input
                formik={formik}
                type="password"
                id="password"
                placeholder="password:"
                name="password"
                error={formik.errors.password}
              />
              <Input
                formik={formik}
                type="password"
                id="rePassword"
                placeholder="rePassword:"
                name="rePassword"
                error={formik.errors.rePassword}
              />
              <Input
                formik={formik}
                type="tel"
                id="phone"
                placeholder="phone:"
                name="phone"
                error={formik.errors.phone}
              />
              <div className="submit-btn md:w-custom-width w-full mx-auto text-start">
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
                    type="submit"
                    className="bg-main text-light py-1 px-2 rounded-md disabled:bg-green-400 "
                  >
                    Register
                  </button>
                )}
              </div>
              <div className="md:w-custom-width w-full mx-auto my-5">
                Alreadey have an account ?
                <Link
                  className="duration-300 text-blue-600 hover:underline "
                  to={"/login"}
                >
                  {" "}
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

/* 

    error ? error : success


*/
