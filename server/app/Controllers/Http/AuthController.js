"use strict";
const Persona = use("Persona");

class AuthController {
  async register({ request, auth, response }) {
    const payload = request.only([
      "email",
      "username",
      "password",
      "password_confirmation"
    ]);

    const user = await Persona.register(payload);

    return auth.generate(user);
  }

  async login({ request, auth }) {
    const payload = request.only(["uid", "password"]);
    // Throws error if invalid payload
    const user = await Persona.verify(payload);
    // If login is OK, then generate token
    return auth.generate(user);
  }
}

module.exports = AuthController;
