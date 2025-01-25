import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css';
import { userContext } from '../../Context/UserContext';
import RecentProducts from './../RecentProducts/RecentProducts';
import axios from 'axios';

export default function Home() {
    

  
  return (
    <>
    <RecentProducts/>
    </>
  )
}
