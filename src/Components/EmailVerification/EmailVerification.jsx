import axios from 'axios';
import React, { useState } from 'react'
import VerificationInput from 'react-verification-input';
import ResetPassword from '../ResetPassword/ResetPassword';
import { Link } from 'react-router-dom';

export default function EmailVerification({message, email, forgotPassword, values}) {
    const [apiError, setApiError] = useState("");
    const [isValid, setIsValid] = useState(false);
    
console.log("val",values);

    async function setVerification(obj){
      try{
        let {data:{status}} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, obj);
        console.log(status);
        setIsValid(true);
      } catch({response:{data:{message}}}){
        console.log(message);
        setApiError(message);
        setIsValid(false);
      }
    }



  return (
    <>
       <div className="box px-8 md:w-custom-width w-full mx-auto py-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
       {!isValid &&<> 
        <div className="box">
          <h3 className="text-2xl md:w-custom-width font-bold w-full text-center mx-auto mb-4">
            Email Verification
          </h3>
          <p className=" md:w-custom-width w-full font-bold text-center  mx-auto mb-8 text-red-900">{message}</p>
            <VerificationInput
              validChars="0-9"
              inputProps={{ inputMode: "numeric" }}
              classNames={{
                container: "md:w-custom-width w-full mx-auto mb-3",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
            length={6}
              onComplete={(code)=> {
                setVerification({"resetCode": code})
              }}
            />
            
            { apiError &&
              <div className={`md:w-custom-width mx-auto text-center text-sm w-full p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                <span className="font-medium">{apiError}</span>
              </div> 
            }
        </div> 
        <div className='md:w-custom-width w-full mx-auto my-5'> 
            Didn't get a code ? 
                        <button onClick={()=> forgotPassword(values)} className='duration-300 text-blue-600 hover:underline '> Resend</button>
        </div>
        </>
        }
        {
        isValid &&  <ResetPassword email={email}/> 
      }
      </div>
      
    </>
  )
}
