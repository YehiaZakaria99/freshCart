import React, { useContext, useState } from "react";
import styles from "./UpdateProfile.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import Input from "../Register/Input/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import logOut from "../Logout/logout";

export default function UpdateProfile() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let {  setUserToken } = useContext(userContext);
  const [userIcon, setUserIcon] = useState(false);
  const { setCart } = useContext(CartContext);
  const { setWishListData } = useContext(wishListContext);

  async function updateProfile(values) {
    try {
      setIsLoading(true);
      let {
        data: {
          user: { email },
        },
      } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setIsLoading(false);
      toast.success("Updated Successfully", {
        position: "center",
      });
      setApiError("");
      logOut(navigate, setUserToken, setUserIcon, setCart, setWishListData);
    } catch (error) {
      setApiError(error.response.data.errors.msg);
      setIsLoading(false);
      console.log(error);
    }
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).max(10),
    email: yup.string().email("invalid email"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyptian number "),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: updateProfile,
  });

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="box md:w-custom-width w-full mx-auto">
            <h3 className="text-2xl md:w-custom-width w-full mx-auto mb-4">
              Update Profile :
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
                      Update
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
