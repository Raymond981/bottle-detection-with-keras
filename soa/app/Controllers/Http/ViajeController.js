'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with viajes
 */

const Viaje = use('App/Models/Viaje');

class ViajeController {
  /**
   * Show a list of all viajes.
   * GET viajes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async autobus ({ request, response, view }) {
    let viajes = await Viaje.query().where('id_autobus', request.input('id_autobus')).where('fecha_de_salida', '!=', request.input('fecha_de_salida')).fetch()
    return response.json(viajes)
  }  

  async fecha ({ request, response, view }) {
    let viajes = await Viaje.query().where('id_origen', request.input('id_origen')).where('id_destino', request.input('id_destino')).where('fecha_de_salida', request.input('fecha_de_salida')).fetch()
    return response.json(viajes)
  }

  async index ({ request, response, view }) {
    let viajes = await Viaje.all()
    return response.json(viajes)
  }

  /**
   * Render a form to be used for creating a new viaje.
   * GET viajes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new viaje.
   * POST viajes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const id_autobus = request.input('id_autobus')
    const id_origen = request.input('id_origen')
    const precio = request.input('precio')
    const id_destino = request.input('id_destino')
    const distancia = request.input('distancia')
    const fecha_de_salida = request.input('fecha_de_salida')
    const hora_de_salida = request.input('hora_de_salida')
    const boletosGenerados = request.input('boletosGenerados')

    const viaje = new Viaje()

    viaje.id_autobus = id_autobus
    viaje.precio = precio
    viaje.id_origen = id_origen
    viaje.id_destino = id_destino
    viaje.distancia = distancia
    viaje.fecha_de_salida = fecha_de_salida
    viaje.hora_de_salida = hora_de_salida
    viaje.boletosGenerados = 0

    await viaje.save()
    return response.json(viaje)
  }
 
  /**
   * Display a single viaje.
   * GET viajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let viaje = await Viaje.find(params.id)
    return response.json(viaje)
  }

  /**
   * Render a form to update an existing viaje.
   * GET viajes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update viaje details.
   * PUT or PATCH viajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id_autobus = request.input('id_autobus')
    const id_origen = request.input('id_origen')
    const id_destino = request.input('id_destino')
    const distancia = request.input('distancia')
    const precio = request.input('precio')
    const fecha_de_salida = request.input('fecha_de_salida')
    const hora_de_salida = request.input('hora_de_salida')
    const boletosGenerados = request.input('boletosGenerados')

    let viaje = await Viaje.find(params.id)

    viaje.id_autobus = id_autobus
    viaje.precio = precio
    viaje.id_origen = id_origen
    viaje.id_destino = id_destino
    viaje.distancia = distancia
    viaje.fecha_de_salida = fecha_de_salida
    viaje.hora_de_salida = hora_de_salida
    viaje.boletosGenerados = boletosGenerados


    await viaje.save()
    return response.json(viaje)
  }

  /**
   * Delete a viaje with id.
   * DELETE viajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let viaje = await Viaje.find(params.id)
    await viaje.delete()
    return response.json({message: 'Viaje deleted!'})
  }
}

module.exports = ViajeController
