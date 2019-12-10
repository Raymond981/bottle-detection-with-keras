'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ciudades
 */

const Ciudade = use('App/Models/Ciudade');


class CiudadeController {
  /**
   * Show a list of all ciudades.
   * GET ciudades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  //getCiudad
  async getCiudad({ request, response, view }) {
    let ciudades = await Ciudade.query().where('ciudad', request.input('ciudad')).fetch()
    return response.json(ciudades)
  }


  async index({ request, response, view }) {
    let ciudades = await Ciudade.all()
    return response.json(ciudades)
  }

  /**
   * Render a form to be used for creating a new ciudade.
   * GET ciudades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new ciudade.
   * POST ciudades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const ciudad = request.input('ciudad')

    const ciudade = new Ciudade()
    ciudade.ciudad = ciudad

    await ciudade.save()
    return response.json(ciudade)
  }

  /**
   * Display a single ciudade.
   * GET ciudades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing ciudade.
   * GET ciudades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update ciudade details.
   * PUT or PATCH ciudades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const ciudad = request.input('ciudad')

    let ciudade = Ciudade.find(params.id)
    ciudade.ciudad = ciudad

    await ciudade.save()
    return response.json(ciduade)
  }

  /**
   * Delete a ciudade with id.
   * DELETE ciudades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    await Ciudade.find(params.id).delete()
    return response.json({ message: 'Ciudad deleted!' })
  }
}

module.exports = CiudadeController
