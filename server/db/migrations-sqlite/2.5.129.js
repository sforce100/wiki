exports.up = async knex => {
  await knex.schema
    .alterTable('pageTree', table => {
      table.integer('sortnum').notNullable().defaultTo(0)
    })

  await knex.schema
    .createTable('pageTreeSort', table => {
      table.increments('id').primary()
      table.string('path').notNullable()
      table.integer('sortnum').notNullable().defaultTo(0)
    })
}

exports.down = knex => { }
