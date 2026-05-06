import { get } from "./api";

export const fetchScreeningsByMovie = (id) => get(`function-movie/${id}`);

export const fetchScreening = (id) => get(`functions/${id}`);
