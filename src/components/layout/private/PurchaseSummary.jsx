import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../helpers/formatDate";
import { Loading } from "../common/Loading";
import { clearSlice } from "../../../features/booking/bookingSlice";
import CardForm from "./CardForm";

export const PurchaseSummary = () => {
  const purchaseSummary = useSelector(state => state.booking.purchaseSummary);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    console.log(purchaseSummary);
  },[purchaseSummary])

  if(Object.keys(purchaseSummary).length > 0) {
    return (
    <div className="ur-wrapper">
      <div className="unique-reserve">
        <div className="unique-reserve__content">
                <h2 className="unique-reserve__content__item unique-reserve__content__item--title">Número de reservación: {purchaseSummary?.reservationId}</h2>
                <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Usuario: <span>{purchaseSummary?.username}</span></h3>
                <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Película: <span>{purchaseSummary?.movieName}</span></h3>
                <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la reservación: {formatDate(purchaseSummary?.dateRes)}</p>
                <p className="unique-reserve__content__item unique-reserve__content__item--pg">Número de sillas: {purchaseSummary?.chairs.length > 0 && purchaseSummary?.chairs.map((el, i) => <span key={i}>{el.numberChair}, </span>)}</p>
                <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la función: {formatDate(purchaseSummary?.dateFun)}</p>
                {/* <p className="unique-reserve__content__item unique-reserve__content__item--pg">Hora de la función: {purchaseSummary?.hourTime}</p> */}
                <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sala: {purchaseSummary?.room}</p>
                <p className="unique-reserve__content__item unique-reserve__content__item--pg">Precio Total: {purchaseSummary?.totalMount}</p>
        </div>
      </div>
      <button onClick= {() => {dispatch(clearSlice()); navigate("/cartelera", {replace: true})}} className="button">Seguir Comprando</button>
      <CardForm />
    </div>
  )
} else {
  return <Loading />
}
};
