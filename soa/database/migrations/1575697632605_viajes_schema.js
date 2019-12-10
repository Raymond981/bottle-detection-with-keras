'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ViajesSchema extends Schema {
  up () {
    this.create('viajes', (table) => {
      table.increments()
      table.integer('id_autobus').unsigned().references('id').inTable('autobuses');
      table.integer('id_origen')
      table.integer('id_destino')
      table.integer('distancia')
      table.integer('precio')
      table.date('fecha_de_salida')
      table.time('hora_de_salida')
      table.integer('boletosGenerados')
      table.timestamps()
    })
  }

  down () {
    this.drop('viajes')
  }
}

module.exports = ViajesSchema
