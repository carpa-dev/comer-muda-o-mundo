'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InitiativesSchema extends Schema {
  up() {
    this.table('initiatives', table => {
      table.text('post');
    });
  }

  down() {
    this.table('initiatives', table => {
      table.dropColumn('post');
    });
  }
}

module.exports = InitiativesSchema;
