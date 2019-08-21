'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProducersSchema extends Schema {
  up() {
    this.table('producers', table => {
      table.text('post');
    });
  }

  down() {
    this.table('producers', table => {
      table.dropColumn('post');
    });
  }
}

module.exports = ProducersSchema;
