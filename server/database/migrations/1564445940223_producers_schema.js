"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProducersSchema extends Schema {
  up() {
    this.create("producers", table => {
      table.increments();

      table.string("name", 255).notNullable();
      table.string("address", 255).notNullable();

      table.decimal("latitude", 13).notNullable();
      table.decimal("longitude", 13).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("producers");
  }
}

module.exports = ProducersSchema;
