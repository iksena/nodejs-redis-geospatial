import pg from 'pg';
import config from '../../config/index.js';

/**
 * Initialization PostgreSQL
 *
 * @param {object} app - app
 */
const postgresInitialization = async (app) => {
  const { Client } = pg;
  const { connection } = config.resources.db;
  const { locals: { logger } } = app;

  try {
    const client = new Client(connection);

    await client.connect();

    Object.assign(app.locals, { dbClient: client });

    logger.info('PostgreSQL Client Connected');
  } catch (error) {
    logger.error(`PostgreSQL Client Error: ${error}`);
  }
};

export default postgresInitialization;
