import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/formatDate";

export const UniqueReserve = ({ currentItems }) => {

  if (currentItems?.length > 0) {
    return (
      <div className="unique-reserve">
        {currentItems &&
          currentItems.map((item, i) => (
            <div className="unique-reserve__content"key={i}>
              <h2 className="unique-reserve__content__item unique-reserve__content__item--title">Número de reservación: {item.id}</h2>
              <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Usuario: <span>{item.myUser.username}</span></h3>
              <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Pelicula: {item.functionMovie.movie.movieName}</h3>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la reservación: {formatDate(item.dateRes)}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sillas: <span>{item.functionChairs && item.functionChairs.map((el, i)=> (<span key= {i}>{`${el.numberChair}, `}</span>))}</span></p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la función: {item.functionMovie.function.date}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Hora de la función: {item.functionMovie.function.hourTime}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sala: {item.functionMovie.function.room}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Precio: ${item.totalMount}</p>
            </div>
          ))}
      </div>
    );
  }
};
