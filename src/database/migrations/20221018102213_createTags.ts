import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tags', table => {
    table.increments();
    table.text('name').notNullable();
    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tags');
}
