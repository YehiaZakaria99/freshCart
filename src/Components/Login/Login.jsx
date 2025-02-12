import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Register/Input/Input";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { setUserToken } = useContext(userContext);
  let { getProductsCart } = useContext(CartContext);
  let { getUserWishList } = useContext(wishListContext);
  let navigate = useNavigate();

  async function login(values) {
    try {
      setIsLoading(true);
      let {
        data: { token },
      } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
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
    email: yup.string().required("email is required").email("invalid email"),
    password: yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="box md:w-custom-width w-full">
          <h3 className="text-2xl md:w-custom-width w-full mx-auto mb-4">
            Login :
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
              <div className="sm:w-custom-width w-full mx-auto flex-wrap gap-y-3 flex justify-between items-center">
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
                    Login
                  </button>
                )}
                <Link
                  className="duration-300 text-blue-600 hover:underline "
                  to={"/forgotPassword"}
                >
                  Forgot password ?
                </Link>
              </div>
              <div className="md:w-custom-width w-full mx-auto my-5">
                Don't have an email ?
                <Link
                  className="duration-300 text-blue-600 hover:underline "
                  to={"/register"}
                >
                  {" "}
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
