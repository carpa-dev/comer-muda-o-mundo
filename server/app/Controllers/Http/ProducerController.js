"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Producer = use("App/Models/Producer");

/**
 * Resourceful controller for interacting with producers
 */
class ProducerController {
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
    return await Producer.all();
  }

  /**
   * Display a single producer.
   * GET producers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Producer.findOrFail(params.id);
  }
}

module.exports = ProducerController;
