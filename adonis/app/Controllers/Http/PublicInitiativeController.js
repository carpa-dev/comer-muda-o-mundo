'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Initiative = use('App/Models/Initiative');
/**
 * Resourceful controller for interacting with producers
 */
class PublicInitiativeController {
  /**
   * Show a list of all producers.
   * GET producers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    // TODO: restrict fields to return
    const p = await Initiative.all();
    return p;
  }
}

module.exports = PublicInitiativeController;
