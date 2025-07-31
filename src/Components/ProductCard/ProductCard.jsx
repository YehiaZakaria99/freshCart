import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";

const ProductCard = React.memo(
  ({
    product,
    isFavourite,
    addProductToCart,
    addProductToWishList,
    deleteProductFromWishList,
  }) => {
    const { rating, fullStars, hasHalfStar, emptyStars } = useMemo(() => {
      const rating = product.ratingsAverage ?? 4.0;
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      return { rating, fullStars, hasHalfStar, emptyStars };
    }, [product.ratingsQuantity]);

    return (
      <>
        <div className=" px-4 ">
          <div className="block w-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[#222] duration-500 group rounded-md overflow-hidden">
            <Link to={`/productdetails/${product.id}`}>
              <img
                className="h-[300px] w-full object-cover"
                src={product.imageCover}
                alt={product.title}
              />
              <div className="py-3 px-3 text-center text-rgba(0,0,0,0.25) duration-500 group-hover:text-main text-lg font-bold">
                <h4 className="text-sm">{product.category.name}</h4>
                <h3 className="truncate">{product.title}</h3>
                <p>{product.price} EGP</p>
                {/* rating */}

                <div className="flex justify-center items-center text-sm">
                  <div className=" px-1 text-main">
                    {/* fullStar */}
                    {Array.from({ length: fullStars }).map((_, i) => (
                      <i className="fa-solid fa-star "></i>
                    ))}
                    {/* halfStar */}

                    {hasHalfStar && (
                      <i class="fa-solid fa-star-half-stroke"></i>
                    )}
                    {/* emptyStar */}
                    {Array.from({ length: emptyStars }).map((_, i) => (
                      <i class="fa-regular fa-star"></i>
                    ))}
                  </div>
                  {/* <i className="fas fa-star "></i> */}
                  {product.ratingsAverage}
                </div>
              </div>
            </Link>
            <div className="px-3 py-2 flex justify-center gap-6">
              <div className="">
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="text-center group-hover:text-main duration-500 rounded-md font-bold"
                >
                  <i className="fa-solid fa-cart-shopping cursor-pointer text-2xl "></i>
                </button>
              </div>
              <div className="">
                {isFavourite ? (
                  <button onClick={() => deleteProductFromWishList(product.id)}>
                    <i className="fa-solid fa-heart  text-2xl cursor-pointer group-hover:text-main duration-500 "></i>
                  </button>
                ) : (
                  <button onClick={() => addProductToWishList(product.id)}>
                    <i className="fa-regular fa-heart text-2xl cursor-pointer duration-500 group-hover:text-main"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default memo(ProductCard);
