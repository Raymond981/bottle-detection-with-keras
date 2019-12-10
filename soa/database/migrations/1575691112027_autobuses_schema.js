'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutobusesSchema extends Schema {
  up () {
    this.create('autobuses', (table) => {
      table.increments()
      table.string('clase')
      table.float('precio_base')
      table.integer('num_asientos')
      table.integer('ocupado')
      table.integer('mantenimiento')
      table.timestamps()
    })
  }

  down () {
    this.drop('autobuses')
  }
}

module.exports = AutobusesSchema
