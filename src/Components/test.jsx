

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';





export let wishListContext =createContext();

export default function WishListContextProvider({children}) {
    const getToken = () => localStorage.getItem("userToken");
    const headers={
        token: localStorage.getItem('userToken')
    }
    const [wishList, setWishList] = useState([]);


    async function addProductToWishList(productId) {
        try {
            let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId
            },{
                headers
            })

            getProductToWishList()
            toast.success(data.message,{
                duration:2000
            })
            
        } catch (err) {
            console.log(err);
            
        }
        
    }
    async function getProductToWishList() {
        try {
            let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                headers
            })
            console.log(data);
            setWishList(data);
       
        } catch (err) {
            console.log(err);
            
        }
        
    }
    useEffect(()=>{
        getProductToWishList();
    
     },[])

     useEffect(() => {
        if (getToken()) {
          getProductToWishList();
        } else {
            setWishList(null); // Clear cart if no user is logged in
        }
      }, [getToken()]);
    
    
     async function deleteProductCountToWishList(productId) {
        try {
            let {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ productId}`,{
                headers
            })
            console.log(data);
    
            setWishList(data);
            toast.success(data.status,{
                duration:2000
            })
    
        } catch (err) {
            console.log(err);
            
        }
    }
 return<wishListContext.Provider value={{addProductToWishList , wishList , deleteProductCountToWishList}}>
  
  {children}
  
  </wishListContext.Provider>

}