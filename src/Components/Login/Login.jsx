import React, { useContext, useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from '../Register/Input/Input';
import axios from 'axios';
import { userContext } from '../../Context/UserContext';


export default function Login() {


  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let {setUserToken} = useContext(userContext);
  let navigate = useNavigate();

  async function login(values){

    try{
      setIsLoading(true)
      let {data:{token}} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
      navigate("/home");
      localStorage.setItem("userToken", token);
      setUserToken(token);
    } catch({response:{data:{message}}}){
      setApiError(message);
      setIsLoading(false)
    }
  }

  const validationSchema = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
    password: yup.string().required("password is required"),
  })


      const formik = useFormik({
        initialValues : {
          email: "",
          password: "",
        },
        validationSchema : validationSchema,
        onSubmit: login
      })  

  return (
    <>
      <div className="box md:w-custom-width w-full mx-auto py-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <h3 className="text-2xl md:w-custom-width w-full mx-auto mb-4">Login :</h3>
                <div className="form ">
                  <form className="" onSubmit={formik.handleSubmit}>
                    { apiError&&
                      <div className={`md:w-custom-width mx-auto text-center text-xlg w-full p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                        <span className="font-medium">{apiError}</span>
                      </div> 
                    }
                    <Input formik={formik} type="email" id="email" placeholder="email:" name="email" error= {formik.errors.email}/>
                    <Input formik={formik} type="password" id="password" placeholder="password:" name="password" error= {formik.errors.password}/>
                    <div className="submit-btn md:w-custom-width w-full mx-auto text-end">
                      {
                        isLoading ? 
                        <button type="submit" className="bg-main text-light py-1 px-2 rounded-md disabled:bg-green-400 " disabled><i className="fas fa-spinner fa-spin"></i></button>
                        :
                        <button type="submit" className="bg-main text-light py-1 px-2 rounded-md disabled:bg-green-400 "  >Login</button>
                      }
                    </div>
                  </form>
                </div>
              </div>
    </>
  )
}
