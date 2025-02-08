import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import AddAddress from "../Brands/AddAddress/AddAddress";
import toast from "react-hot-toast";

export default function UserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAddressId, setLoadingAddressId] = useState(null);
  const [isClosed, setIsClosed] = useState(true);


  async function getAddresses() {
    try {
      setIsLoading(true);
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data.data);
      setAddresses(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  }

  async function deleteAddress(addressId) {
    try {
      setLoadingAddressId(addressId);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
        { headers: { token: localStorage.getItem("userToken") } }
      );
      //   setbtnLoading(false);
      toast.success(data.message, {
        position: "center",
      });
      setAddresses(data.data);
    } catch (err) {
      setLoadingAddressId(null);
      toast.error(data.message, {
        position: "center",
      });
      setbtnLoading(true);
      console.log(err);
    }
  }

  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <>
      <section className="my-32">
        <div className="container w-3/4 px-10  py-14 min-w-[400px]">
          <div className="box py-10 px-10 my-10 flex flex-col items-center xl:items-stretch">
            <h2 className="font-semibold text-3xl">Your Addresses</h2>
            <div className="addresses flex flex-wrap gap-x-3 justify-center xl:justify-stretch">
              {/* Add Address */}
              <div className="add-box w-[300px] h-[250px] min-w-[150px] max-w-full my-5">
                <button
                  onClick={() => setIsClosed(false)}
                  className=" shadow-[0_0_5px] shadow-main flex flex-col items-center justify-center w-full h-full gap-y-4"
                >
                  <i className="fa-solid fa-plus text-5xl text-main"></i>
                  <span className="font-semibold text-xl">Add Address</span>
                </button>
              </div>
              {/* Addresses */}
              {isLoading ? (
                <Loading />
              ) : (
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between relative add-box py-2 shadow-[0_0_5px] shadow-main  w-[300px] h-[250px] min-w-[150px] max-w-full my-5"
                  >
                    <ul className="p-4 space-y-3 overflow-auto">
                      <li>
                        <h3 className="font-bold">{address.name}</h3>
                      </li>
                      <li>
                        <p>{address.details}</p>
                      </li>
                      <li>
                        <p>{address.phone}</p>
                      </li>
                      <li>
                        <p>{address.city}</p>
                      </li>
                    </ul>
                    <div className="px-4 relative w-full bottom-2">
                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="bg-red-800 px-2 py-1 rounded-md text-white"
                        disabled={loadingAddressId === address._id}
                      >
                        {loadingAddressId === address._id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* ############################################ MODAL ############################################ */}
            {!isClosed && (
              <AddAddress
                setAddresses={setAddresses}
                setIsClosed={setIsClosed}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
