import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/formatDate";


export const Summary = () => {

    const purchaseSummary = useSelector(state => state.booking.purchaseSummary);
    const data = purchaseSummary?.data;

    return (
        <div className="unique-reserve__content margin">
            <h2 className="unique-reserve__content__item unique-reserve__content__item--title">Número de reservación: {data?.reservationId}</h2>
            <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Usuario: <span>{data?.username}</span></h3>
            <h3 className="unique-reserve__content__item unique-reserve__content__item--title">Película: <span>{data?.movieName}</span></h3>
            <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la reservación: {formatDate(data?.dateRes)}</p>
            <p className="unique-reserve__content__item unique-reserve__content__item--pg">Número de sillas: {data?.chairs?.length > 0 && data?.chairs.map((el, i) => <span key={i}>{el.numberChair}, </span>)}</p>
            <p className="unique-reserve__content__item unique-reserve__content__item--pg">Fecha de la función: {formatDate(data?.dateFun)}</p>
            {/* <p className="unique-reserve__content__item unique-reserve__content__item--pg">Hora de la función: {data?.hourTime}</p> */}
            <p className="unique-reserve__content__item unique-reserve__content__item--pg">Sala: {data?.room}</p>
            <p className="unique-reserve__content__item unique-reserve__content__item--pg">Precio Total: {data?.totalMount}</p>
        </div>
    )
}
