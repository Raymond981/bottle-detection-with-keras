'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Autobus extends Model {
    boletos(){
        return this.hasMany('App/Models/Boleto')
    }
}

module.exports = Autobus
