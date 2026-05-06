import React, { useEffect, useState } from "react";
import { UniqueReserve } from "../private/UniqueReserve";
import ReactPaginate from "react-paginate";
import { getReservationByPagesMiddleware } from "../../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./Loading";
import { Modal } from "./Modal";
import { setModal } from "../../../features/ui/modalSlice";

export const PaginatedItems = ({ itemsPerPage }) => {

  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.booking.reservations
  );
  const { totalElements } = useSelector(
    (state) => state.booking.reservations
  );

  const userId = useSelector(state => state?.auth?.userLogin?.userData?.idUser) || JSON.parse(localStorage.getItem("user"))?.userData?.idUser;


  const items = reservations.content ? reservations.content : [];

  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  const currentItems = items.slice(0, 1);
  const pageCount = Math.ceil(totalElements / itemsPerPage);

  const handlePageClick = (e) => {
    setItemOffset(e.selected + 1);
  };

  useEffect(() => {
    setLoading(true)
    dispatch(getReservationByPagesMiddleware(itemOffset, userId))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        // Si la promesa falla
        console.error('Error fetching reservations:', error);
        setLoading(false);
        setError(true)
      });
  }, [itemOffset]);

  return (
    <>
      {loading ? (
        <Loading />  // O cualquier componente que uses para mostrar la carga
      ) : (
        <UniqueReserve currentItems={currentItems} />
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        onPageChange={(e) => {
          handlePageClick(e);
        }}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="isActive"
      />
    </>
  );
};
