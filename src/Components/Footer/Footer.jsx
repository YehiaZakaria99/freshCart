import React, { useState } from 'react'
import styles from './Footer.module.css';
import amazonPay from '../../assets/images/footer/amazon-pay.png'
import americanExpress from '../../assets/images/footer/american-express.png'
import masterCard from '../../assets/images/footer/master-card.png'
import payPal from '../../assets/images/footer/paypal.png'
import googlePlay from '../../assets/images/footer/googlePlay.png'
import appStore from '../../assets/images/footer/appStore.png'

export default function Footer() {
    
  return (
    <>
      {/* <footer className="py-3 bg-gray-200">
        <div className="container">
          <div className="box space-y-3">
            <h3 className='text-2xl '>Get the FreshCart app</h3>
            <p className='text-gray-500'>We will send you a link, open it on your phone to download the app.</p>
            <div className="">
              <div className="form flex flex-col space-y-4  space-x-0 md:flex-row md:space-x-4 md:space-y-0 px-4">
                <input className='flex-1 border-0 outline-none px-3 py-1 rounded-md shadow' type="email" name="email" id="email" placeholder='Email ..' />
                <button className='bg-green-600 text-white font-thin px-7 rounded-md'>Share App Link</button>
              </div>
              <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center border-y-2 border-gray-300 py-5  my-3'>
                <div className="payment flex items-center space-x-2 px-4 ">
                  <h4>Payment Partners</h4>
                  <img className='w-10 object-contain' src={amazonPay} alt="amazonPay" />
                  <img className='w-10 object-contain' src={americanExpress} alt="americanExpress" />
                  <img className='w-10 object-contain' src={masterCard} alt="masterCard" />
                  <img className='w-10 object-contain' src={payPal} alt="payPal" />
                </div>
                <div className="deliveries payment flex space-x-2 px-4  items-center">
                  <h4>Get deliveries with FreshCart</h4>
                  <img className='h-10 object-contain' src={appStore} alt="appStore" />
                  <img className='h-10 object-contain' src={googlePlay} alt="googlePlay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  )
}
