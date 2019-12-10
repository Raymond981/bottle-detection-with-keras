'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Viaje extends Model {
    autobus(){
        return this.belongsTo('App/Models/Autobus')
    }
    ciudad(){
        return this.hasMany('App/Models/Ciudade')
    }
    boleto(){
        return this.hasMany('App/Models/Boleto')
    }
}

module.exports = Viaje
