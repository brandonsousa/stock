'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.boolean('ready').defaultTo(false)
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
      table.integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
      table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('amount').defaultTo(1)
      table.decimal('price')
      table.string('description', 120)
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
