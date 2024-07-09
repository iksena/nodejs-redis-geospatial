import redis from 'redis';

import config from '../../config/index.js';

/**
 * Initialization redis
 *
 * @param {object} app - app
 */
const redisInitialization = async (app) => {
  const { port, host } = config.resources.redis;
  const { locals: { logger } } = app;

  const redisClient = redis.createClient(port, host);

  redisClient.on('error', (err) => {
    logger.error(`Redis Client Error: ${err}`);
  });

  logger.info('Open connection to redis server...');

  Object.assign(app.locals, { redisClient });
};

export default redisInitialization;
