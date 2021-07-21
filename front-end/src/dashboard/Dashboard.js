import React, { useEffect, useState } from "react";
import {
  listReservations,
  listTables,
  finishTable,
  updateStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ReservationsList from "../reservation/ReservationsList";
import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();
  const filterResults = true;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables);

    return () => abortController.abort();
  }

  async function finishHandler(table_id) {
    const abortController = new AbortController();
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (result) {
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }

    return () => abortController.abort();
  }

  const cancelHandler = async (event) => {
    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (result) {
      await updateStatus(event.target.value, "cancelled");
      loadDashboard();
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for ${date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <button
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>
          Next
        </button>
        <button onClick={() => history.push(`/dashboard?date=${today()}`)}>
          Today
        </button>
      </div>
      <ReservationsList
        reservations={reservations}
        filterResults={filterResults}
        cancelHandler={cancelHandler}
      />
      <hr></hr>
      <TablesList tables={tables} finishHandler={finishHandler} />
    </main>
  );
}

export default Dashboard;
