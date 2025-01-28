import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { addProductToCart, cart, isAdded } = useContext(CartContext);

  async function getProducts() {
    setIsLoading(true);
    try {
      let {
        data: { data },
      } = await axios(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="box py-3">
              <h2 className="md:text-xl font-bold">Products</h2>
              <section className="products flex flex-wrap gap-y-6 py-8 justify-center">
                {products.map((product, index) => (
                  <div
                    className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-3 py-3 rounded-md duration-300 hover:shadow-sm hover:shadow-black hover:scale-105 overflow-hidden "
                    key={index}
                  >
                    <Link to={`productdetails/${product.id}`}>
                      <img
                        className=""
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <h4 className="text-main text-sm">
                        {product.category.name}
                      </h4>
                      <h3>{product.title.split(" ", 2).join("")}</h3>
                      <div className="flex justify-between">
                        <p>{product.price} EGP</p>
                        <p>
                          <i className="fas fa-star text-yellow-400"></i>
                          {product.ratingsQuantity}
                        </p>
                      </div>
                    </Link>
                    <div className="btn py-2 opacity-0 duration-500 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 ">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="text-center bg-main text-light w-full py-2 rounded-md font-bold"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}
