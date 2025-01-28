import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addProductToCart } = useContext(CartContext);
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

  async function getSpecificProduct(productId) {
    try {
      setIsLoading(true);
      let {
        data: { data },
      } = await axios(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    getSpecificProduct(id);
    console.log(product.imageCover);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <section className="productDetails py-10">
            <div className="box flex items-center gap-6 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-1/3 img lg:w-1/4 ">
                <Slider {...settings}>
                  {product.images?.map((image, index) => (
                    <img key={index} src={image} alt={product.title} />
                  ))}
                </Slider>
              </div>
              <div className="w-full md:w-2/3 content lg:w-3/4 space-y-3">
                <h2>{product.title}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p>{product.category?.name}</p>
                <div className="flex justify-between">
                  <p>{product.price} EGP</p>
                  <p>
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsQuantity}
                  </p>
                </div>
                <div className="btn py-2 ">
                  <button
                    className="text-center bg-main text-light w-full py-2 rounded-md font-bold"
                    onClick={() => addProductToCart(product.id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
