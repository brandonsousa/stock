'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Client = use('App/Models/Client')
const Product = use('App/Models/Product')
const Sale = use('App/Models/Sale')
const Databse = use('Database')
class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ view }) {
    const sales = await Databse.raw('SELECT s.*, s.id AS "sid", u.username AS "user", c.*, p.name AS "product" '+
    'FROM sales AS s '+
    'INNER JOIN users AS u ON s.user_id = u.id '+
    'INNER JOIN clients AS c ON s.client_id = c.id '+
    'INNER JOIN products AS p ON s.product_id = p.id WHERE s.ready = 0')

    return view.render('sales.all', {
      sales: sales[0]
    })
  }

  /**
   * Render a form to be used for creating a new sale.
   * GET sales/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    const products = await Product.query().where('amount','>', 0 ).fetch()

    return view.render('sales.create', {
      products: products.toJSON()
    })
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const newSale = request.all()
    const c = await Client.findBy('phone', newSale.phone)
    if(c){
      const p = await Product.find(newSale.product_id)
      if(p){
        const totalPrice = newSale.amount * p.price_to_sale
        
        const subtractToAmount = p.amount - newSale.amount

        p.merge({
          amount : subtractToAmount
        })

        await p.save()

        newSale.price = totalPrice
        const {product_id, description} = newSale
         
        await Sale.create({ 'user_id' : auth.user.id, 'price': newSale.price, product_id, description, 'amount' : newSale.amount, 'client_id' : c.id})
        return response.redirect('/sale/create')
      }
    }
    return response.send('Venda não realizada')
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    
  }

  async checkout({params, response}){
    const sale = await Sale.find(params.id)

    sale.merge({
      ready : true
    })

    await sale.save()

    return response.redirect('/sale')
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    
  }
}

module.exports = SaleController
