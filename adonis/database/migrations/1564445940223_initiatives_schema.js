'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InitiativesSchema extends Schema {
  up() {
    this.create('initiatives', table => {
      table.increments();

      table.string('name', 255).notNullable();
      table.string('address', 255).notNullable();

      table.string('latitude', 13).notNullable();
      table.string('longitude', 13).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('initiatives');
  }
}

module.exports = InitiativesSchema;
