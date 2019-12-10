'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Boleto extends Model {
    viaje(){
        return this.belongsTo('App/Models/viaje')
    }
    autobus(){
        return this.hasMany('App/Models/Autobus')
    }
}

module.exports = Boleto
