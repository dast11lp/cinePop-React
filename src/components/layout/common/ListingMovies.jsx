import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesMiddleware, cleanMovies } from "../../../features/movies/moviesSlice";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { setModal } from "../../../features/ui/modalSlice";
import { Loading } from "./Loading";

export const ListingMovies = () => {
  const listMovies = useSelector((state) => state.movies.listingMovies);

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getMoviesMiddleware())
      .catch((error) => {
        dispatch(setModal({
          type: "error",
          title: "Error de conexion.",
          message: error.toString(),
          open: true,
        }))
      })

    return () => {
      dispatch(cleanMovies())
    }
  }, []);

  if (listMovies.length > 0) {
    return (
      <div className="listMovies">
        {listMovies.map((movie) => (
          <Link to={`/funciones/${movie.id}`} key={movie.id} className="card__link">
            <Card
              movie={movie}
            />
          </Link>
        ))}
      </div>
    );
  } else {
    return (<Loading />)
  }
};
