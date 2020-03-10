'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('provider_id')
        .unsigned()
        .references('id')
        .inTable('providers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name').notNullable()
      table.string('size').notNullable()
      table.integer('amount').notNullable()
      table.bigInteger('bar_code').notNullable().unique()
      table.date('due').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
