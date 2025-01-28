import React, { useEffect, useState } from "react";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],

    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  async function getCategories() {
    try {
      setIsLoading(true);
      let {
        data: { data },
      } = await axios(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> :
        <div className="container">
          <div className="box py-3 space-y-2 border-y-2">
            <h2 className="md:text-xl font-bold">Shop Popular Categories</h2>
            <div className="categories">
              <Slider {...settings}>
                {categories?.map((category, index) => (
                  <div key={index} className="">
                    <div className="img">
                      <img className="w-full h-[200px] object-contain sm:object-cover object-top" src={category.image} alt={category.name} />
                    </div>
                    <h3 className="category-name mt-3 text-center">{category.name}</h3>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      }
    </>
  );
}
