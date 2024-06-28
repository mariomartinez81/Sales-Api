import { Options, Sequelize } from 'sequelize';

import { config } from './../config';
import { setupModels } from '../db/models';

const setupSequalize = () => {
  const options: Options = {
    dialect: 'postgres',
    logging: config.isProd ? false : true,
  };

  if (config.isProd) {
    options.dialectOptions = {
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  const sequelize = new Sequelize(config.dbUrl, options);

  setupModels(sequelize);

  return sequelize;
};

export default setupSequalize;
