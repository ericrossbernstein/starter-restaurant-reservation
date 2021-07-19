import React, { useState } from "react";
import { listReservations } from "../utils/api";

export const Search = () => {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const changeHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    let res = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    setReservations(res);
    setSubmitted(true);

    return () => abortController.abort();
  };

  function renderReservations(reservations) {
    if (reservations.length) {
      return reservations.map((reservation) => (
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
            <p>Status: {reservation.status}</p>
          </div>
        </div>
      ));
    } else {
      return <h4>No reservations found</h4>;
    }
  }

  return (
    <div>
      <h3>Search</h3>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              placeholder="Enter a customer's phone number"
              value={mobileNumber}
              maxLength="12"
              onChange={changeHandler}
            />
          </div>
          <button type="submit">Find</button>
        </form>
      </div>
      {submitted ? renderReservations(reservations) : ""}
    </div>
  );
};

export default Search;
