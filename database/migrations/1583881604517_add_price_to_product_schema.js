'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPriceToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.decimal('price_to_sale')
      table.decimal('purchase_price')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddPriceToProductSchema
