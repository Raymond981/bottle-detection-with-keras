'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CiudadesSchema extends Schema {
  up () {
    this.create('ciudades', (table) => {
      table.increments()
      table.string('ciudad')
      table.timestamps()
    })
  }

  down () {
    this.drop('ciudades')
  }
}

module.exports = CiudadesSchema
