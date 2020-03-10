'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name', 80).notNullable()
      table.string('phone', 14).notNullable().unique()
      table.string('street',60).notNullable()
      table.string('number',6).notNullable()
      table.string('neighborhood',60).notNullable()
      table.string('city',40).notNullable()
      table.string('reference',120).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
