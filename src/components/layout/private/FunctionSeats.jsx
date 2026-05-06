import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  
  clearSlice,
  functionFetchMiddleware,
  reserveFetchMiddleware,
} from "../../../features/booking/bookingSlice";
import { setModal } from "../../../features/ui/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";

export const FunctionSeats = () => {
  const function_ = useSelector((state) => state.booking.function_);
  const reservationDetails = useSelector(
    (state) => state.booking.reservationDetails
  );

  const selectedIdSeats = useSelector((state) => state.booking.selectedIdSeats);
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const desiredTickets = useSelector((state) => state.booking.desiredTickets);

  const messageWhenEmptyTickets = "Previamente debe elegir  los tickets deseados"

  const howManyselectedIdSeats = useSelector(
    (state) => state.booking.numselectedIdSeats
  );
  const chairs = function_?.functionChairs;

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(functionFetchMiddleware(id));
    return () => {
      dispatch(clearSlice());
    }
  }, []);

  useEffect(() => {}, [selectedIdSeats]);


  const askForSeat = (available, idSeat, numSeat) => {
    if(desiredTickets == 0) {
      dispatch(
        setModal({
          type: "warr",
          title: "",
          message: messageWhenEmptyTickets,
          open: true,
        })
      );
      return;
    }
      if (available) {
        if (selectedIdSeats.includes(idSeat)) {
          dispatch(
            setModal({
              type: "remove",
              title: "Remover elección",
              message: "¿Desea quitar el asiento de su lista de reservas?",
              open: true,
              others: {
                idSeat,
                numSeat,
              },
            })
          );
        } else {
          dispatch(
            setModal({
              type: "addSeat",
              title: "Reservar",
              message: "¿Desea reservar este asiento?",
              open: true,
              others: {
                idSeat,
                numSeat,
              },
            })
          );
        }
      } else {
        dispatch(
          setModal({
            type: "warr",
            title: "Asiento ocupado",
            message: "Este asiento se encuentra reservado.",
            open: true,
          })
        );
      }
    
  };


  const reserve = () => {
    if(desiredTickets == 0) {
      dispatch(
        setModal({
          type: "warr",
          title: "",
          message: messageWhenEmptyTickets,
          open: true,
        })
      );
      return 
    }

    // reserva efectiva
    if(selectedIdSeats.length  - desiredTickets === 0) {
      dispatch(
        setModal({
          type: "reserve",
          title: "Asientos seleccionados",
          message: `Estos son los asientos seleccionados: ${selectedSeats.length > 10 ? selectedSeats.slice(0, 10)+' ...': selectedSeats} ¿Desea continuar?`,
          open: true,
          others: {
            reservationDetails,
          },
        })
      );
    }else {
      dispatch(
        setModal({
          type: "warr",
          title: "",
          message: `Aun te faltan ${desiredTickets - selectedIdSeats.length } asientos por elegir`,
          open: true,
        })
      ); 
    }
    
  };

  return (
    <div className="function-seats">
      <div className="function-seats__content">
        <div className="custom-section">
          <p className="custom-section__title">Tickets: {howManyselectedIdSeats}</p>
          <div className="custom-section__description">
            <p className="custom-section__description__pg">Sillas libres:  <span className="custom-section__description__pg__background chairs__chair--free"><FontAwesomeIcon icon={faCouch} className="chairs__chair__icon chairs__chair__icon--small" /></span></p>
            <p className="custom-section__description__pg">Sillas ocupadas:  <span className="custom-section__description__pg__background chairs__chair--reserved"><FontAwesomeIcon icon={faCouch} className="chairs__chair__icon chairs__chair__icon--small" /></span></p>
            <p className="custom-section__description__pg">Sillas seleccionadas:  <span className="custom-section__description__pg__background chairs__chair--selected"><FontAwesomeIcon icon={faCouch} className="chairs__chair__icon chairs__chair__icon--small" /></span></p>
            <p className="custom-section__description__pg">Sillas para seleccionar:  <span className="custom-section__description__pg__background chairs__chair--toReserve"><FontAwesomeIcon icon={faCouch} className="chairs__chair__icon chairs__chair__icon--small" /></span></p>
          </div>
          </div>
        <div className="chairs">
          {chairs?.map((el, i) => ( 
            <div
              className={`chairs__chair chairs__chair--${
                !el.available ? "reserved" : "not-reserved"
              } ${
                selectedIdSeats.includes(el.id)
                  ? "chairs__chair--selected"
                  : ""
              }`}
              key={i}
              onClick={() => askForSeat(el.available, el.id, el.numberChair)}
            >
              <FontAwesomeIcon icon={faCouch} className="chairs__chair__icon" />
              <span className="chairs__chair__number">{el.id}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="button" onClick={reserve}>
        Comprar Tickets
      </button>
    </div>
  );
};
