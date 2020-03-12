'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPriceToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.double('price_to_sale')
      table.double('purchase_price')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddPriceToProductSchema
