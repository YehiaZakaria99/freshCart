import React, { useContext, useState } from "react";
import styles from "./ResetPassword.module.css";
import VerificationInput from "react-verification-input";
import axios from "axios";
import Input from "../Register/Input/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function ResetPassword({ email }) {
  const [isLoading, setIsLoading] = useState(false);

  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();

  async function setNewPassword({ newPassword }) {
    const obj = { email, newPassword };
    console.log(obj);
    try {
      let {
        data: { token },
      } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        obj
      );
      navigate("/login");
    } catch ({
      response: {
        data: { message },
      },
    }) {
      console.log(message);
      setApiError(message);
      setIsValid(false);
    }
  }

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,9}$/,
        "Password must start with an uppercase letter, include at least one number, and be 5-9 characters long"
      ),
    rePassword: yup
      .string()
      .required("Re-enter password is required")
            .oneOf([yup.ref("newPassword")], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: setNewPassword,
  });

  return (
    <>
      <div className="form ">
        <form className="" onSubmit={formik.handleSubmit}>
          <Input
            formik={formik}
            type="password"
            id="newPassword"
            placeholder="newPassword"
            name="newPassword"
            error={formik.errors.newPassword}
          />
          <Input
            formik={formik}
            type="password"
            id="rePassword"
            placeholder="confirmPassword:"
            name="rePassword"
            error={formik.errors.rePassword}
          />
          <div className="md:w-custom-width w-full mx-auto flex justify-between items-center">
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
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

/* 
error= {formik.errors.password}


*/
