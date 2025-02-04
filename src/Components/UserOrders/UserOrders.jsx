import React, { useEffect, useState } from "react";
import styles from "./UserOrders.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading/Loading";

export default function UserOrders() {
  const token = localStorage.getItem("userToken");
  const [userOrders, setUserOrders] = useState("");
  const [visibleItems, setVisibleItems] = useState({}); // Object to track visibility



  function handleViewItem(orderId){
    // setViewItems()
    setVisibleItems((prev)=> (
      {
        ...prev, [orderId]: !prev[orderId]
      }
    ))
  }

  const decoded = jwtDecode(token);
  console.log(decoded);

  async function getUserOrders() {
    try {
      const { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      {userOrders ? (
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto p-4">
            {/* <h2 className="text-xl my-4">UserOrders</h2> */}
            {/* Header Section */}
            <header className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h1 className="text-2xl font-bold">Welcome, {decoded.name}!</h1>
              {/* <p className="text-gray-600 break-all">
              Email: yehiazakaria16199@gmail.com | Phone: 01206962954
            </p> */}
              <p className="text-gray-600">
                You have placed {userOrders?.length} orders.
              </p>
            </header>
            {/* Orders List */}
            <div className="space-y-6">
              {userOrders.map((order, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="order-summary">
                    <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">Date: {order.paidAt.split("",10)}</p>
                    <p className="text-gray-600">Total: {order.totalOrderPrice} EGP</p>
                    <p className="text-gray-600">Payment Method: {order.paymentMethodType}</p>
                    <p className="text-gray-600 mb-4">
                      Shipping Address: 
                        <span className="block text-sm font-bold ps-6">
                          <span className="block">{order.shippingAddress.details}</span>
                          <span className="block">{order.shippingAddress.phone}</span>
                          <span className="block">{order.shippingAddress.city}</span>
                        </span>
                    </p>
                    <p className="text-gray-600">
                      Status:{" "}
                      {order.shippingAddress.isDelivered ?
                      <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                        Delivered
                      </span>
                      :
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                        Pending
                      </span>}
                    </p>
                    <button onClick={()=>handleViewItem(order.id) } className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 toggle-items">
                    {visibleItems[order.id] ? "Hide Items" : "View Items"}
                    </button>
                  </div>
                  <div className={`order-items ${!visibleItems[order.id] && "hidden" } mt-6`}>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-3 text-left">Image</th>
                          <th className="p-3 text-left">Product</th>
                          <th className="p-3 text-left">Quantity</th>
                          <th className="p-3 text-left">Price</th>
                          <th className="p-3 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((item, index)=>
                          <tr key={index} className="border-b">
                          <td className="p-3">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="p-3">{item.product.title}</td>
                          <td className="p-3">{item.count}</td>
                          <td className="p-3">{item.price} EGP</td>
                          <td className="p-3">{item.price * item.count} EGP</td>
                          </tr>
                      )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
