import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesMiddleware, cleanMovies } from "../../../features/movies/moviesSlice";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { setModal } from "../../../features/ui/modalSlice";
import { Loading } from "./Loading";

export const ListingMovies = () => {
  const listMovies = useSelector((state) => state.movies.listingMovies);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const hasMore = useSelector((state) => state.movies.hasMore);

  const dispatch = useDispatch();
  const bottomRef = useRef(null);



  // controlar React StrictMode Open
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    dispatch(getMoviesMiddleware(0)).catch((error) => {
      dispatch(setModal({
        type: "error",
        title: "Error de conexion.",
        message: error.toString(),
        open: true,
      }));
    });

    return () => {
      dispatch(cleanMovies());
    };
  }, []);

  // controlar React StrictMode Close

  useEffect(() => {
    dispatch(getMoviesMiddleware(0)).catch((error) => {
      dispatch(setModal({
        type: "error",
        title: "Error de conexion.",
        message: error.toString(),
        open: true,
      }));
    });

    return () => {
      dispatch(cleanMovies());
    };
  }, []);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(getMoviesMiddleware(currentPage)).catch((error) => {
          dispatch(setModal({
            type: "error",
            title: "Error de conexion.",
            message: error.toString(),
            open: true,
          }));
        });
      }
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [currentPage, hasMore]);

  if (listMovies.length === 0) return <Loading />;

  return (
    <div className="listMovies">
      {listMovies.map((movie) => (
        <Link to={`/funciones/${movie.id}`} key={movie.id} className="card__link">
          <Card movie={movie} />
        </Link>
      ))}
      {hasMore && <div ref={bottomRef} style={{ height: "20px" }} />}
    </div>
  );
};




//////////////////////////////////////////////////////////////////////////////////////
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMoviesMiddleware, cleanMovies } from "../../../features/movies/moviesSlice";
// import { Card } from "./Card";
// import { Link } from "react-router-dom";
// import { setModal } from "../../../features/ui/modalSlice";
// import { Loading } from "./Loading";

// export const ListingMovies = () => {
//   const listMovies = useSelector((state) => state.movies.listingMovies);

//   const dispatch = useDispatch();



//   useEffect(() => {
//     dispatch(getMoviesMiddleware())
//       .catch((error) => {
//         dispatch(setModal({
//           type: "error",
//           title: "Error de conexion.",
//           message: error.toString(),
//           open: true,
//         }))
//       })

//     return () => {
//       dispatch(cleanMovies())
//     }
//   }, []);

//   if (listMovies.length > 0) {
//     return (
//       <div className="listMovies">
//         {listMovies.map((movie) => (
//           <Link to={`/funciones/${movie.id}`} key={movie.id} className="card__link">
//             <Card
//               movie={movie}
//             />
//           </Link>
//         ))}
//       </div>
//     );
//   } else {
//     return (<Loading />)
//   }
// };
