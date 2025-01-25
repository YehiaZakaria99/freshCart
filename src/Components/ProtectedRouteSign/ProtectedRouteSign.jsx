import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteSign({ children }) {
  if (!localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}