import { Knex } from 'knex';
import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    extension: 'ts',
  },
  useNullAsDefault: true,
} as Knex.Config;
