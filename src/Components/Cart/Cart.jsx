import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    isLoading,
    cart,
    updateCartProductQuantity,
    deleteProductFromCart,
    clearCart,
  } = useContext(CartContext);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 my-20">
            <div className="text-center my-4 py-4 space-y-2">
              <h3 className="font-bold text-3xl">My Cart</h3>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {cart?.data?.products?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={item.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={item.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            updateCartProductQuantity(
                              item.product.id,
                              item.count - 1
                            )
                          }
                          disabled={item.count == 1}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {item.count}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            updateCartProductQuantity(
                              item.product.id,
                              item.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price * item.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteProductFromCart(item.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        <i className="fa-solid fa-trash fa-2x text-red-500"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              <div className="clear text-center py-8">
                <button
                  onClick={() => clearCart()}
                  className={`${!cart?.data?.products?.length && "hidden"} bg-red-700 text-light px-7 py-2 rounded-lg text-lg font-semibold`}
                >
                  Clear Cart
                </button>
              </div>
            <div className="flex gap-y-4  px-5 py-8 justify-between flex-wrap items-center">
              <h3 className={`${!cart?.data?.products?.length && "hidden"} text-2xl font-bold`}>
                Total Price:{" "}
                <span className="text-xl font-semibold text-main">
                  {cart?.data?.totalCartPrice} EGP
                </span>
              </h3>
              <h3 className={`${cart?.data?.products?.length && "hidden"} text-center text-2xl font-bold`}>
                Your cart is empty
              </h3>
              <div className="flex flex-1 justify-center sm:justify-end">
                <Link
                  to={`${cart?.data?.products?.length ? "/checkout" : "/cart"}`}
                  className="text-sm font-semibold bg-main px-3 py-2 text-light rounded-lg"
                >
                  <button
                    onClick={() =>
                      !cart?.data?.products?.length &&
                      toast(
                        "Your Cart is Empty",
                        {
                          icon: (
                            <i className=" fa-solid fa-circle-exclamation text-red-400"></i>
                          ),
                          position: "center",
                        },
                      )
                    }
                  >
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
