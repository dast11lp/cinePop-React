import { get, getAuth, postAuth } from "./api";

export const fetchChairs = (id) =>
  getAuth(`functionChair/chairs-by-function/${id}`);

export const fetchReservationIds = (idUser) =>
  getAuth(`reservation/user/${idUser}/getMyReserveIds`);

export const fetchReservation = (idUser, idReservation) =>
  getAuth(`reservation/user/${idUser}/getReserve/${idReservation}`);

export const fetchReservationsByPage = (page = 1, idUser) =>
  getAuth(`reservation/user/${idUser}/getReservesPages?page=${page}`);

export const createReservation = (body) => {
  const idUser = JSON.parse(localStorage.getItem("user"))?.userData?.idUser;
  return postAuth(
    `reservation/user/${idUser}/reserve-function-movie`,
    body
  );
};

export const processPayment = (body) => postAuth('payments/', body)