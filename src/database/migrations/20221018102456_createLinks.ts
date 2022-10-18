import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links', table => {
    table.increments();
    table.text('url').notNullable();
    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links');
}
