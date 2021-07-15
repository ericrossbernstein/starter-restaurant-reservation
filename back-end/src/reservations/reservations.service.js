const knex = require("../db/connection.js");

function list(date) {
  return knex("reservations")
    .select("*")
    .where("reservation_date", date)
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  read,
  create,
};
