import React, { useContext, useState } from 'react'
import styles from './Home.module.css';
import { userContext } from '../../Context/UserContext';

export default function Home() {
    
  let { userToken , setUserToken} = useContext(userContext);
  // console.log(values);
  
  return (
    <>
      <h2>Home</h2>
    </>
  )
}
