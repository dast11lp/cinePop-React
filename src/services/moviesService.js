import { get } from "./api";

export const fetchMovies = () => get("movies/list");
