import { config } from '../../src/config';

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
