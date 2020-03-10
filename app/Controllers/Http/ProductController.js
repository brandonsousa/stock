'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require('axios')

const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const Provider = use('App/Models/Provider')
const Database = use('Database')
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ view }) {
    const products = await Database.raw('SELECT prod.*, prov.name AS "provider", usr.username AS "user", cat.name AS "category" '+ 
    'FROM products AS prod '+
    'INNER JOIN providers AS prov ON prov.id = prod.provider_id '+
    'INNER JOIN users AS usr ON usr.id = prod.user_id '+
    'INNER JOIN categories AS cat ON cat.id = prod.category_id')
    return view.render('products.all', {
      products : products[0]
    })
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    
    const categories = await Category.all()
    const providers = await Provider.all()

    return view.render('products.create', {
      categories : categories.toJSON(),
      providers : providers.toJSON()
    })
    
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    const newProduct = request.all()

    await Product.create({ 'user_id' : auth.user.id, ...newProduct})

    return response.redirect('/products/create')

  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, view }) {
    const productToEdit = await Product.find(params.id)
    console.log(productToEdit.toJSON())
    return view.render('products.edit', {
      product : productToEdit
    })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProductController
