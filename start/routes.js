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

Route.resource('/users', 'UserController').middleware('auth')
Route.resource('/categories', 'CategoryController').middleware('auth')
Route.resource('/products', 'ProductController').middleware('auth')
Route.resource('/clients', 'ClientController').middleware('auth')
Route.resource('/providers', 'ProviderController').middleware('auth')
Route.resource('/sale', 'SaleController').middleware('auth')
Route.get('/sale/checkout/:id', 'SaleController.checkout').middleware('auth')

Route.get('/', 'AuthController.index')
Route.post('/auth', 'AuthController.login')
Route.get('/auth/logout', 'AuthController.logout')

Route.resource('/dashboard', 'DashboardController').middleware('auth')

Route.get('/c/j', 'CategoryController.j')
