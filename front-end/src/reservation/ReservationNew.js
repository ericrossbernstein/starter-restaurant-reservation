import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationErrors from "./ReservationErrors";

export const ReservationNew = () => {
  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [reservation, setReservation] = useState({
    ...initialReservationState,
  });
  const [reservationErrors, setReservationErrors] = useState(null);
  const history = useHistory();

  const changeHandler = (event) => {
    if (event.target.name === "people") {
      setReservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
    }
  };

  function hasValidDate(reservation) {
    const date = reservation.reservation_date;
    const time = reservation.reservation_time;
    const formattedDate = new Date(`${date}T${time}`);
    const day = new Date(date).getUTCDay();
    const errors = [];

    // No reservations on Tuesdays
    if (day === 2) {
      errors.push(new Error("Restaurant is closed on Tuesdays."));
    }

    // No reservations in the past
    if (formattedDate < new Date()) {
      errors.push(new Error("Reservation must be in the future."));
    }

    return errors;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const errors = hasValidDate(reservation);
    if (errors.length) {
      return setReservationErrors(errors);
    }

    createReservation(reservation, abortController.signal)
      .then(history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setReservationErrors);

    return () => abortController.abort();
  };

  return (
    <section>
      <h1>Create a Reservation:</h1>
      <ReservationErrors errors={reservationErrors} />
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required={true}
              value={reservation.first_name}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required={true}
              value={reservation.last_name}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              value={reservation.mobile_number}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              id="reservation_date"
              name="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              required={true}
              value={reservation.reservation_date}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="reservation_time">Reservation Time:</label>
            <input
              id="reservation_time"
              name="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              required={true}
              value={reservation.reservation_time}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="people">Number of People:</label>
            <input
              id="people"
              name="people"
              type="number"
              required={true}
              value={reservation.people}
              min={1}
              onChange={changeHandler}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button onClick={() => history.goBack()}>Cancel</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ReservationNew;
