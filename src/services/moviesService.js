import { get } from "./api";

export const fetchMovies = (page = 0) => get(`movies/list?page=${page}&size=6`);
