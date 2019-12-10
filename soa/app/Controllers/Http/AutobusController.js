'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with autobuses
 */

const Autobus = use('App/Models/Autobus');

class AutobusController {
  /**
   * Show a list of all autobuses.
   * GET autobuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let autobuses = await Autobus.all()
    return response.json(autobuses)
  }

  /**
   * Render a form to be used for creating a new autobus.
   * GET autobuses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new autobus.
   * POST autobuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const clase = request.input('clase')
    const precio_base = request.input('precio_base')
    const num_asientos = request.input('num_asientos')

    const autobus = new Autobus()
    autobus.clase = clase
    autobus.precio_base = precio_base
    autobus.num_asientos = num_asientos
    autobus.ocupado = 0
    autobus.mantenimiento = 0

    await autobus.save()
    return response.json(autobus)
  }

  /**
   * Display a single autobus.
   * GET autobuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let autobus = await Autobus.find(params.id)
    return response.json(autobus)
  }

  /**
   * Render a form to update an existing autobus.
   * GET autobuses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update autobus details.
   * PUT or PATCH autobuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const clase = request.input('clase')
    const precio_base = request.input('precio_base')
    const num_asientos = request.input('num_asientos')
    const ocupado = request.input('ocupado')
    const mantenimiento = request.input('mantenimiento')


    let autobus = await Autobus.find(params.id)

    autobus.clase = clase
    autobus.precio_base = precio_base
    autobus.num_asientos = num_asientos
    autobus.ocupado = ocupado
    autobus.mantenimiento = mantenimiento

    await autobus.save()
    return response.json(autobus)
  }

  /**
   * Delete a autobus with id.
   * DELETE autobuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const autobus = await Autobus.find(params.id)
    await autobus.delete()
    return response.json({message: 'Autobus deleted!'})
  }
}

module.exports = AutobusController
