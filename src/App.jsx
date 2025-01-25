import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserContextProvider from "./Context/UserContext";
import { useEffect, useState } from "react";
import ProtectedRouteSign from "./Components/ProtectedRouteSign/ProtectedRouteSign";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from './Components/ResetPassword/ResetPassword';



const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "register", element:  <ProtectedRouteSign><Register /></ProtectedRouteSign>  },
      { path: "login", element: <ProtectedRouteSign><Login /></ProtectedRouteSign>},
      { path: "forgotPassword", element: <ProtectedRouteSign><ForgotPassword /></ProtectedRouteSign>},
      // { path: "resetPassword", element: <ProtectedRouteSign><ResetPassword /></ProtectedRouteSign>},
      { index: true , element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {  
  
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routes} />
      </UserContextProvider>
    </>
  );
}

export default App;
