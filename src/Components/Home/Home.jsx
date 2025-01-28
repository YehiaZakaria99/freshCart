import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css';
import { userContext } from '../../Context/UserContext';
import RecentProducts from './../RecentProducts/RecentProducts';
import axios from 'axios';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from './../MainSlider/MainSlider';

export default function Home() {
    

  
  return (
    <>
    <MainSlider />
    <CategoriesSlider/>
    <RecentProducts/>
    </>
  )
}
