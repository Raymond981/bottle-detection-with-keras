'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoletosSchema extends Schema {
  up () {
    this.create('boletos', (table) => {
      table.increments()
      table.integer('id_autobus').unsigned().references('id').inTable('autobuses');
      table.integer('id_viaje').unsigned().references('id').inTable('viajes')
      table.string('nombre')
      table.string('tipo')
      table.binary('vendido')
      table.integer('asiento')
      table.timestamps()
    })
  }

  down () {
    this.drop('boletos')
  }
}

module.exports = BoletosSchema
