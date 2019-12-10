'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.put('/api/autobuses/:id', 'AutobusController.update')
Route.delete('/api/autobuses/:id', 'AutobusController.destroy')
Route.post('/api/autobuses', 'AutobusController.store')
Route.get('/api/autobuses/:id', 'AutobusController.show')
Route.get('/api/autobuses', 'AutobusController.index')

Route.put('/api/boletos/:id', 'BoletoController.update')
Route.delete('/api/boletos/:id', 'BoletoController.destroy')
Route.post('/api/boletos', 'BoletoController.store')
Route.get('/api/boletos', 'BoletoController.index')
Route.post('/api/getBoletos', 'BoletoController.boletos')
Route.post('/api/boletosVendidos', 'BoletoController.boletosVendidos')
Route.post('/api/autobuses/obtenerById', 'BoletoController.getBoletos')

Route.put('/api/ciudades/:id', 'CiudadeController.update')
Route.delete('/api/ciudades/:id', 'CiudadeController.destroy')
Route.post('/api/ciudades', 'CiudadeController.store')
Route.get('/api/ciudades', 'CiudadeController.index')
Route.post('/api/getCiudad', 'CiudadeController.getCiudad')

Route.put('/api/viajes/:id', 'ViajeController.update')
Route.delete('/api/viajes/:id', 'ViajeController.destroy')
Route.post('/api/viajes', 'ViajeController.store')
Route.get('/api/viajes', 'ViajeController.index')
Route.get('/api/viajes/:id', 'ViajeController.show')
Route.post('/api/viajeSalida', 'ViajeController.fecha')
Route.post('/api/viajesPorAutobus', 'ViajeController.autobus')