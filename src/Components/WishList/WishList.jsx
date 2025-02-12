import React, { useContext, useState } from 'react'
import styles from './WishList.module.css';
import Loading from '../Loading/Loading';
import { wishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {
    const {isLoading , wishListData, deleteProductFromWishList} = useContext(wishListContext)
    const { addProductToCart} = useContext(CartContext)
  return (
    <>
      {/* {!isLoading ? ( */}
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 my-20">
            <div className='text-center my-4 py-4 space-y-2'>
              <p><i className="fa-regular fa-heart fa-4x"></i></p>
              <h3 className='font-bold text-3xl'>My WishList</h3>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {wishListData?.data?.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img
                        src={item.imageCover}
                        className="w-16 md:w-32 max-w-full w- min-w-[175px] max-h-full"
                        alt={item.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <button
                          onClick={() => addProductToCart(item.id)}
                          className="text-center bg-main text-light px-4 py-2 rounded-md font-bold text-xs"
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
      {/* ) : (
        <Loading />
      )} */}
    </>
  );
}
