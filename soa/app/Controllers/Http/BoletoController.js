'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with boletos
 */
const Boleto = use('App/Models/Boleto');


class BoletoController {
  /**
   * Show a list of all boletos.
   * GET boletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async boletosVendidos({request, response, view}){
    let boletos = await Boleto.query().where('id_autobus', request.input('id_autobus')).where('vendido', 1).fetch()
    return response.json(boletos)
  }

  async getBoletos({request, response, view}){

  }

  async boletos ({ request, response, view }) {
    let boletos = await Boleto.query().where('id_autobus', request.input('id_autobus')).where('id_viaje', request.input('id_viaje')).fetch()
    return response.json(boletos)
  }

   async index ({ request, response, view }) {
    let boletos = await Boleto.all()
    return response.json(boletos)
  }

  /**
   * Render a form to be used for creating a new boleto.
   * GET boletos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new boleto.
   * POST boletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const id_autobus = request.input('id_autobus')
    const id_viaje = request.input('id_viaje')
    const nombre = request.input('nombre')
    const tipo = request.input('tipo')
    const asiento = request.input('asiento')

    const boleto = new Boleto()

    boleto.id_autobus = id_autobus
    boleto.id_viaje = id_viaje 
    boleto.nombre = nombre
    boleto.tipo = tipo
    boleto.asiento = asiento
    boleto.vendido = 0

    await boleto.save()
    return response.json(boleto)
  }

  /**
   * Display a single boleto.
   * GET boletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing boleto.
   * GET boletos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update boleto details.
   * PUT or PATCH boletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id_autobus = request.input('id_autobus')
    const id_viaje = request.input('id_viaje')
    const nombre = request.input('nombre')
    const tipo = request.input('tipo')
    const vendido = request.input('vendido')
    const asiento = request.input('asiento')

    let boleto = await Boleto.find(params.id)

    boleto.id_autobus = id_autobus
    boleto.id_viaje = id_viaje
    boleto.nombre = nombre
    boleto.tipo = tipo
    boleto.asiento = asiento
    boleto.vendido = vendido

    await boleto.save()
    return response.json(boleto)
  }

  /**
   * Delete a boleto with id.
   * DELETE boletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    await Boleto.find(params.id).delete()
    return response.json({message: 'Boleto deleted!'})
  }
}

module.exports = BoletoController
