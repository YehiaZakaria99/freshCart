import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../Register/Input/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import VerificationInput from "react-verification-input";
import ResetPassword from "./../ResetPassword/ResetPassword";
import EmailVerification from "../EmailVerification/EmailVerification";

export default function ForgotPassword() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState("");

  async function forgotPassword(values) {
    setValues(values);
    // <VerificationInput validChars="0-9" inputProps={{ inputMode: "numeric" }} />
    console.log(values);
    try {
      setIsLoading(true);
      let {
        data: { message },
      } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      setEmail(values.email);
      setVerifyEmail(message);
      setIsLoading(false);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setApiError(message);
      setIsLoading(false);
      setVerifyEmail("");
    }
  }

  const validationSchema = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: forgotPassword,
  });

  return (
    <>
      {!verifyEmail && (
        <div className="h-screen flex justify-center items-center">
        <div className="box px-8 md:px-0 md:w-custom-width w-full mx-auto py-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h3 className="text-lg md:w-custom-width w-full mx-auto mb-4  ">
            Enter your email to reset your password :
          </h3>
          <div className="form ">
            <form className="" onSubmit={formik.handleSubmit}>
              {apiError && (
                <div
                  className={`md:w-custom-width mx-auto text-center text-sm w-full p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
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
              <div className="md:w-custom-width w-full mx-auto flex gap-2 items-center">
                {isLoading ? (
                  <button
                    type="submit"
                    className="bg-main text-light py-1 px-2 rounded-md disabled:bg-green-400 "
                    disabled
                  >
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="bg-main text-light py-1 px-2 rounded-md "
                    >
                      Submit
                    </button>
                    <Link
                      to={"/"}
                      className="bg-red-800 text-light py-1 px-2 rounded-md "
                    >
                      Cancel
                    </Link>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {verifyEmail && (
        <div className="h-screen flex justify-center items-center">
        <EmailVerification
          message={verifyEmail}
          email={email}
          forgotPassword={forgotPassword}
          values={values}
        />
        </div>
      )}
    </>
  );
}
