import React from "react";
import { Link } from "react-router-dom";

export const Reservations = ({ reservations }) => (
  <div>{reservations.map(renderReservation)}</div>
);

function renderReservation(reservation) {
  const { status } = reservation;

  return status === "finished" ? (
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
      {status === "booked" ? (
        <div>
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Reservations;
