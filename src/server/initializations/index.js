import redisInitialization from './connectRedis.js';
import postgresInitialization from './connectPostgreSQL.js';

export default [
  redisInitialization,
  postgresInitialization,
];
