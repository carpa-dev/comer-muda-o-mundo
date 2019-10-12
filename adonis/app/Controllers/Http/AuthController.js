'use strict';
const Persona = use('Persona');

class AuthController {
  async register({ request, auth, response }) {
    const payload = request.only([
      'email',
      'username',
      'password',
      'password_confirmation',
    ]);

    const user = await Persona.register(payload);

    return auth.generate(user);
  }

  async login({ request, auth }) {
    const payload = request.only(['uid', 'password']);
    // Throws error if invalid payload
    const user = await Persona.verify(payload);

    // loggout user from other instance
    await auth.authenticator('jwt').revokeTokensForUser(user);

    // If login is OK, then generate token
    return auth.withRefreshToken().generate(user);
  }

  async refresh({ request, auth }) {
    const refreshToken = request.input('refresh_token');

    return await auth.generateForRefreshToken(refreshToken, true);
  }
}

module.exports = AuthController;
