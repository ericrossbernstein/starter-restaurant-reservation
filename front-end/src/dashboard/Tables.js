import React from "react";

export const Tables = ({ tables }) => {
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
        </div>
      ))}
    </div>
  );
};

export default Tables;
