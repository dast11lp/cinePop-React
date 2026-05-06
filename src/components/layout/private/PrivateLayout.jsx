import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateLayout = () => {
  const user =  useSelector(state => state.auth.userLogin?.userData) || localStorage.getItem("user");
 

  return <> {user ? <Outlet /> : <Navigate to="/public/login" replace={true} />}</>
};
