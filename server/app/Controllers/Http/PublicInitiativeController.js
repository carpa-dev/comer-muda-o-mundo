'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Producer = use('App/Models/Producer');
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
    return await Producer.all();
  }
}

module.exports = PublicInitiativeController;
