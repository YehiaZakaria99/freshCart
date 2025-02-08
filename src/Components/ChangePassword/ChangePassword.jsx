import React, { useContext, useState } from "react";
import styles from "./ChangePassword.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../Register/Input/Input";
import { userContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import logOut from "../Logout/logout";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function ChangePassword() {
  // navigate, setUserToken, setUserIcon, setCart, setWishListData
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(userContext);
  const [userIcon, setUserIcon] = useState(false);
  const { setCart } = useContext(CartContext);
  const { setWishListData } = useContext(wishListContext);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function changePassword(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword/`,
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setIsLoading(false);
      toast.success("Password Updated Successfully", {
        position: "center",
      });
      setApiError("");
      logOut(navigate, setUserToken, setUserIcon, setCart, setWishListData)
      console.log(data);
    } catch (error) {
      setApiError(error.response.data.errors.msg || "Something went wrong");
      setIsLoading(false);
      console.log(error);
    }
  }

  const validationSchema = yup.object({
    currentPassword: yup.string().required("currentPassword is required"),
    password: yup.string().required("password is required"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "password isn't match"),
  });
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="box md:w-custom-width w-full mx-auto">
            <h3 className="text-2xl md:w-custom-width w-full mx-auto mb-4">
              Change Password :
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
                  type="password"
                  id="currentPassword"
                  placeholder="currentPassword:"
                  name="currentPassword"
                  error={formik.errors.currentPassword}
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
                      Update Password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
