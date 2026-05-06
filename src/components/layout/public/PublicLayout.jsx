import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setPreviousPage } from "../../../features/ui/previousPathSlice";
import { useState } from "react";

export const PublicLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [previousPageTwo, setPreviousPageTwo] = useState();
  const user =  useSelector(state => state.auth.userLogin?.userData) || localStorage.getItem("user");

  useEffect(() => {
    setPreviousPageTwo(location.pathname);
    dispatch(setPreviousPage(previousPageTwo));
  }, [location.pathname]);

  return <> {!user ? <Outlet /> : <Navigate to="/" replace={true} />}</>;
};
