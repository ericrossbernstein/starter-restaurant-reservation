import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable, readReservation } from "../utils/api";

export const ReservationSeat = () => {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [reservation, setReservation] = useState({});
  const history = useHistory();

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  const changeHandler = async (event) => {
    await setTableId(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await updateTable(reservation.reservation_id, tableId);
    history.push("/dashboard");
  };

  return (
    <div>
      <h3>Reservation Seat</h3>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <select
              id="table_id"
              name="table_id"
              value={tableId}
              required={true}
              onChange={changeHandler}
            >
              <option value="">- Select a table -</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={table.capacity < reservation.people}
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
            <button onClick={() => history.goBack()}>Cancel</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ReservationSeat;
