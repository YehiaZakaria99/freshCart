import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
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
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserOrders from "./Components/UserOrders/UserOrders";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import UserAddresses from "./Components/UserAddresses/UserAddresses";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "register",
        element: (
          <ProtectedRouteSign>
            <Register />
          </ProtectedRouteSign>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRouteSign>
            <Login />
          </ProtectedRouteSign>
        ),
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: (
          <ProtectedRouteSign>
            <ForgotPassword />
          </ProtectedRouteSign>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateprofile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "userAddresses",
        element: (
          <ProtectedRoute>
            <UserAddresses />
          </ProtectedRoute>
        ),
      },
      {
        path: "changepassword",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
        <WishListContextProvider>
          <QueryClientProvider client={queryClient}>
            <CartContextProvider>
              <UserContextProvider>
                <RouterProvider router={routes} />
                <Toaster />
              </UserContextProvider>
            </CartContextProvider>
          </QueryClientProvider>
        </WishListContextProvider>
    </>
  );
}

export default App;
