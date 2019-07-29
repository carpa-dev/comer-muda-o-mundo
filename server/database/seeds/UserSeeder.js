"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    const user = await Factory.model("App/Models/User").create({
      username: "test",
      email: "test@test.com",
      password: "test123"
    });

    const token = await Factory.model("App/Models/Token").make();

    await user.tokens().save(token);
  }
}

module.exports = UserSeeder;
