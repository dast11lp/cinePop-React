import { Link } from "react-router-dom"

export const DropDown = ({ movie }) => {
    return (
                <div>
                    <div
                        className={`dropdown__content`}
                        data-content={movie.function.date}
                    >
                        <h4>Hora: {movie.function.hourTime}</h4>
                        <Link to={`/compras/funcion/tickets/${movie.function.id}`} className="link">
                            Ver Disponibilidad
                        </Link>
                    </div>
                </div>
    )
}

