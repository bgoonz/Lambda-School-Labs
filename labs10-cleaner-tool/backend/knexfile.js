// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    ssl: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
