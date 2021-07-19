import React from "react";

export const Tables = ({ tables, finishHandler }) => {
  return (
    <div>
      {tables.map((table) => (
        <div key={table.table_id}>
          <h3>
            Table {table.table_name}: {table.capacity} people
          </h3>
          <p data-table-id-status={table.table_id}>
            {table.occupied ? "Occupied" : "Free"}
          </p>
          {table.occupied ? (
            <button
              data-table-id-finish={table.table_id}
              onClick={() => finishHandler(table.table_id)}
            >
              Finish
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Tables;
