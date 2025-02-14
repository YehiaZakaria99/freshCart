import React, { useState } from 'react'
import styles from './Footer.module.css';
import amazonPay from '../../assets/images/footer/amazon-pay.png'
import americanExpress from '../../assets/images/footer/american-express.png'
import masterCard from '../../assets/images/footer/master-card.png'
import payPal from '../../assets/images/footer/paypal.png'
import googlePlay from '../../assets/images/footer/googlePlay.png'
import appStore from '../../assets/images/footer/appStore.png'
import { Link } from 'react-router-dom';

export default function Footer() {
    
  return (
    <>
      <footer className="py-3 bg-[#222] shadow-[0_0_3px] shadow-blue-950 w-full ">
        <div className="container text-[#fff]">
          <div className="box space-y-3">
            <h3 className='text-2xl '>Get the FreshCart app</h3>
            <p className='text-gray-500'>We will send you a link, open it on your phone to download the app.</p>
            <div className="">
              <div className="form flex flex-col space-y-4  space-x-0 md:flex-row md:space-x-4 md:space-y-0 px-4">
                <input className='flex-1 border-0 outline-none px-3 py-1 rounded-md shadow' type="email" name="email" id="footerEmail" placeholder='Email ..' />
                <button className='bg-main text-white font-thin px-7 rounded-md'>Share App Link</button>
              </div>
              <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center border-y-2 border-gray-300 py-5  my-3'>
                <div className="payment flex flex-wrap md:flex-nowrap items-center justify-center space-x-2 px-4 ">
                  <h4 className='text-center'>Payment Partners</h4>
                  <div className="flex flex-wrap justify-center md:flex-nowrap">
                  <img className='w-10 object-contain' src={amazonPay} alt="amazonPay" />
                  <img className='w-10 object-contain' src={americanExpress} alt="americanExpress" />
                  <img className='w-10 object-contain' src={masterCard} alt="masterCard" />
                  <img className='w-10 object-contain' src={payPal} alt="payPal" />
                  </div>
                </div>
                <div className="deliveries paymen flex flex-wrap md:flex-nowrap justify-center space-x-2 px-4  items-center">
                  <h4 className='text-center'>Get deliveries with FreshCart</h4>
                  <div className="flex flex-wrap justify-center md:flex-nowrap">
                  <img className='h-10 object-contain' src={appStore} alt="appStore" />
                  <img className='h-10 object-contain' src={googlePlay} alt="googlePlay" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap space-x-3 text-xl">
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://instagram.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-instagram"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://facebook.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-facebook"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://tiktok.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-tiktok"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://x.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-x-twitter"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://linkedin.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-linkedin"></i>{" "}
                      </Link>
                      <Link
                        className={"duration-500 hover:text-main"}
                        target="_blank"
                        to={"https://youtube.com"}
                      >
                        {" "}
                        <i className="fa-brands fa-youtube"></i>{" "}
                      </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
