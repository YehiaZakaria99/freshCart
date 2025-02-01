import React, { useContext, useState } from 'react'
import styles from './WishList.module.css';
import Loading from '../Loading/Loading';
import { wishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {
    const { wishListData, deleteProductFromWishList} = useContext(wishListContext)
    const { addProductToCart} = useContext(CartContext)
  return (
    <>
      {wishListData ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='text-center my-4 py-4 space-y-2'>
              <p><i className="fa-regular fa-heart fa-4x"></i></p>
              <h3 className='font-bold text-3xl'>My WishList</h3>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead> */}
              <tbody>
                {wishListData.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img
                        src={item.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={item.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td className="px-1 py-4 font-semibold text-gray-900 dark:text-white">
                      <button
                          onClick={() => addProductToCart(item.id)}
                          className="text-center bg-main text-light w-full py-2 rounded-md font-bold"
                        >
                          Add To Cart
                      </button>
                    </td>
                    <td className='px-6 py-4'>
                      <button onClick={() => deleteProductFromWishList(item.id)}><i className="fa-solid fa-trash fa-2x text-red-500"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
