import { knex } from 'knex';
import path from 'path';

export const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    extension: 'ts',
  },
  useNullAsDefault: true,
});
