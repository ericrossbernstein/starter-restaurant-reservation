import React from "react";
import { Link } from "react-router-dom";

export const Reservations = ({ reservations }) => {
  return (
    <div>
      {reservations.map((res) => (
        <div key={res.reservation_id}>
          <div>
            <h3>
              {res.reservation_id}: {res.first_name} {res.last_name}
            </h3>
            <p>{res.mobile_number}</p>
            <p>{res.reservation_date}</p>
            <p>{res.reservation_time}</p>
            <p>{res.people}</p>
          </div>
          <div>
            <Link to={`/reservations/${res.reservation_id}/seat`}>Seat</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservations;
