import React, { useState } from "react";
import styles from "./MainSlider.module.css";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import banner1 from "../../assets/images/grocery-banner.png";
import banner2 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className="container py-10">
        <div className="box flex py-6 ">
          <div className="w-3/4">
            <Slider {...settings}>
               <img className="w-full h-full md:h-[400px] sm:object-cover object-contain" src={slide1} alt="" />
               <img className="w-full h-full md:h-[400px] sm:object-cover object-contain" src={slide2} alt="" />
               <img className="w-full h-full md:h-[400px] sm:object-cover object-contain" src={slide3} alt="" />
            </Slider>
          </div>
          <div className="w-1/4 flex flex-col ">
             <img className="w-full h-1/2 md:h-[200px] object-cover " src={banner1} alt="" />
             <img className="w-full h-1/2 md:h-[200px] object-cover " src={banner2} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
