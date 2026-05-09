import { formatDate } from "../../../helpers/formatDate";
import getTime from "../../../helpers/getHourFromDate";

export const UniqueReserve = ({ currentItems }) => {


  console.log(currentItems);
  if (currentItems?.length > 0) {
    return (
      <div className="unique-reserve">
        {currentItems &&
          currentItems.map((item, i) => (
            <div className="unique-reserve__content" key={i}>
              <h2 className="unique-reserve__content__item unique-reserve__content__item--title">Número de reservación: {item.reservationId}</h2>
              <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Usuario: <span>{item?.username}</span></h3>
              <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Pelicula: {item?.movieName}</h3>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la reservación: {formatDate(item?.dateRes)}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sillas: <span>{item?.chairs && item?.chairs?.map((el, i) => (<span key={i}>{`${el.numberChair}, `}</span>))}</span></p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la función: {item?.dateFun}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Hora de la función: {getTime(item?.dateFun)}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sala: {item?.room}</p>
              <p className="unique-reserve__content__item unique-reserve__content__item--pg">Precio: ${item?.totalMount}</p>
            </div>
          ))}
      </div>
    );
  }
};
