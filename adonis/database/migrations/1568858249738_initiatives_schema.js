'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class InitiativesSchema extends Schema {
  up() {
    this.rename('initiatives', 'old_initiatives');

    this.create('initiatives', table => {
      table.increments();

      table.string('name', 255).notNullable();
      table.string('address', 255).notNullable();

      table.string('latitude', 100).notNullable();
      table.string('longitude', 100).notNullable();

      table.text('post');

      table.timestamps();
    });

    this.schedule(async trx => {
      // create table
      const initiatives = await Database.table('old_initiatives').transacting(
        trx
      );

      if (initiatives.length) {
        await Database.table('initiatives')
          .transacting(trx)
          .insert(initiatives);
      }
    });

    this.drop('old_initiatives');
  }

  down() {}
}

module.exports = InitiativesSchema;
