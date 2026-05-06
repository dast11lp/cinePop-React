
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../common/Loading";
import { clearSlice } from "../../../features/booking/bookingSlice";
import CardForm from "./CardForm";
// import { useEffect } from "react";
import { Summary } from "./Summary";
import { useEffect } from "react";

export const PurchaseSummary = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchaseSummary = useSelector(state => state?.booking?.purchaseSummary);
  const data = purchaseSummary?.data;

  useEffect(() => {
  }, [purchaseSummary])

  if (!data || Object.keys(data).length === 0) {
    return <Loading />
  } else {
    return (
      <div className="ur-wrapper">
        <h2>Resumen de reserva</h2>
        <div className="unique-reserve">
          <Summary />
          <div className="payment margin">
            <CardForm />
          </div>
        </div>
        <button onClick={() => { dispatch(clearSlice()); navigate("/cartelera", { replace: true }) }} className="button">Cancelar</button>
      </div>
    )
  }
};
