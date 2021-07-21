import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";

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

  function hasValidDateAndTime(reservation) {
    const date = reservation.reservation_date;
    const time = reservation.reservation_time;
    const errors = [];

    // No reservations on Tuesdays
    const day = new Date(date).getUTCDay();
    if (day === 2) {
      errors.push(new Error("Restaurant is closed on Tuesdays"));
    }

    // No reservations in the past
    const formattedDate = new Date(`${date}T${time}`);
    if (formattedDate < new Date()) {
      errors.push(new Error("Reservation must be in the future"));
    }

    // No reservations before 10:30AM or after 9:30PM
    const hours = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);
    if (hours < 10 || (hours === 10 && minutes < 30)) {
      errors.push(new Error("Reservation must be after 10:30AM"));
    }
    if (hours > 21 || (hours === 21 && minutes > 30)) {
      errors.push(new Error("Reservation must be before 9:30PM"));
    }

    return errors;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const errors = hasValidDateAndTime(reservation);
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
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};

export default ReservationNew;
