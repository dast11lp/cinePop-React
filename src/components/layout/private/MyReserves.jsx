import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UniqueReserve } from "./UniqueReserve";
import { PaginatedItems } from "../common/PaginatedItems";


export const MyReserves = () => {

  return (
    <div className="my-reserves">
      <h2 className="my-reserves__title">Mis Compras</h2>
      <PaginatedItems itemsPerPage={1} />
    </div>
  );
};
