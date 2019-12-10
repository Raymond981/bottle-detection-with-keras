'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ciudade extends Model {
    viaje(){
        return this.belongsTo('App/Models/Viaje')
    }
}

module.exports = Ciudade
