"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validate, validateAll } = use("Validator");
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
   * Create/save a new producer.
   * POST producers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = await validateInput(request);

    const newProducer = await Producer.create(data);

    return await this.show({ params: newProducer });
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

  /**
   * Update producer details.
   * PUT or PATCH producers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.all();
    const producer = await Producer.findOrFail(params.id);

    producer.merge(data);

    await producer.save();
    return await Producer.findOrFail(params.id);
  }

  /**
   * Delete a producer with id.
   * DELETE producers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const p = await Producer.findOrFail(params.id);

    await p.delete();
    return {};
  }
}

async function validateInput(request) {
  const data = request.all();
  const rules = {
    name: "required",
    address: "required",
    latitude: "required",
    longitude: "required"
  };

  const validation = await validate(data, rules);

  if (validation.fails()) {
    // TODO
    throw new Error(
      "Validation failed" + JSON.stringify(validation.messages())
    );
  }

  return data;
}

module.exports = ProducerController;
