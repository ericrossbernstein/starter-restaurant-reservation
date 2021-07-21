import React from "react";
import { Link } from "react-router-dom";

export const ReservationsList = ({
  reservations,
  cancelHandler,
  filterResults,
}) => {
  function checkStatus(reservation) {
    return (
      reservation.status === "finished" || reservation.status === "cancelled"
    );
  }

  function renderReservations(reservations) {
    if (reservations.length) {
      return reservations.map((reservation) => {
        // Dashboard shows only booked and seated results, whereas Search shows all results
        return filterResults && checkStatus(reservation) ? (
          ""
        ) : (
          <div key={reservation.reservation_id}>
            <div>
              <h3>
                {reservation.reservation_id}: {reservation.first_name}{" "}
                {reservation.last_name}
              </h3>
              <p>Mobile Number: {reservation.mobile_number}</p>
              <p>Date: {reservation.reservation_date}</p>
              <p>Time: {reservation.reservation_time}</p>
              <p>Number of people: {reservation.people}</p>
              <p data-reservation-id-status={reservation.reservation_id}>
                Status: {reservation.status}
              </p>
            </div>
            {reservation.status === "booked" ? (
              <div>
                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  Seat
                </Link>
                <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                  Edit
                </Link>
                <button
                  type="button"
                  data-reservation-id-cancel={reservation.reservation_id}
                  value={reservation.reservation_id}
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      });
    } else {
      return <h4>No reservations found</h4>;
    }
  }

  return <div>{renderReservations(reservations)}</div>;
};

export default ReservationsList;
