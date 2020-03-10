'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellSchema extends Schema {
  up () {
    this.create('sells', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('sells')
  }
}

module.exports = SellSchema
