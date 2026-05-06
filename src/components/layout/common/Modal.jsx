import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../features/ui/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  removeIdSeats,
  reserveFetchMiddleware,
  setIdSeats,
} from "../../../features/booking/bookingSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const modalSlice = useSelector((state) => state.modal.modalData);

  const navigate = useNavigate();

  const renderButton = () => {
    switch (modalSlice.type) {
      case "info":
        return <Link className="button">Aceptar</Link>;
      case "addSeat":
        return <button className="button button--secundary button--accept" onClick={(e) => acceptButton(e, setIdSeats)}>Aceptar</button>;
      case "remove":
        return <button className="button button--secundary button--accept" onClick={(e) => acceptButton(e, removeIdSeats)}>Remover</button>;
      case "reserve":
        return <button className="button button--secundary button--accept" onClick={(e) => acceptButton(e, reserveFetchMiddleware)}>Comprar</button>;
      default:
        return null;
    }
  };

  const closeModal = () => {
    dispatch(
      setModal({
        type: undefined,
        title: undefined,
        message: undefined,
        open: false,
      })
    );
  };


  const acceptButton = (e, middleware) => {
    if (e.key === "Enter" || e._reactName == "onClick") {
      if (middleware) {
        dispatch(middleware(modalSlice.others))
        closeModal();
      };
      if (modalSlice.type == "reserve") {
        navigate("/compras/funcion/purchaseSummary");
      }
    }
  }

  useEffect(() => {
    const buttonAccept = document.querySelector(".button--accept");
    if (buttonAccept) {
      buttonAccept.focus();
      buttonAccept.addEventListener("keydown", acceptButton);

      return () => {
        buttonAccept.removeEventListener("keydown", acceptButton);
      };
    }
  }, []);

  

  return (
    <div className="modal">
      <div className="modal__box">
        <div className="modal__box__close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
        <div className="modal__box__content">
          <h2>{modalSlice.title} </h2>
          <p>{modalSlice.message}</p>
        </div>
        <div className="modal__button-section">
          {renderButton()}
          <button className="button button--reject" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
