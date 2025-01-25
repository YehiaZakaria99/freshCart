import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function RecentProducts() {

    const [products, setProducts] = useState([]);


    async function getProducts(){
      let {data:{data}} = await axios(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data);
    //   console.log(products);
    }
  
  
    useEffect(()=>{
      getProducts();
    },[])

  return (
    <>
      <h3>RecentProducts</h3>

        <section className='products flex flex-wrap gap-y-4 gap-x-3 justify-center'>
            {
                products.map((product, index)=>(
                    <div className='w-1/6' key={index}>
                    <img src={product.imageCover} alt={product.title} />
                    <h4>{product.category.name}</h4>
                    <h3>{product.title.split(" ", 2).join("")}</h3>
                    <div>
                        <p>190</p>
                        <p>star</p>
                    </div>
                </div>
                ))
            }
        </section>
      
    </>
  )
}
