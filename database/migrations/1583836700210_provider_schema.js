'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name', 20).notNullable()
      table.string('email', 80).notNullable()
      table.string('phone', 14).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('providers')
  }
}

module.exports = ProviderSchema
