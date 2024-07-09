import env from 'dotenv';

env.config();

export default {
  port: process.env.SERVICE_PORT || 3000,
  loggerOptions: {
    name: process.env.SERVICE_NAME || 'ms-shops',
    level: process.env.LOG_LEVEL || 'debug',
  },
  resources: {
    db: {
      connection: {
        connectionString: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        database: process.env.DATABASE_NAME || 'postgres',
        user: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        ssl: (process.env.DATABASE_SSL || false) && {
          key: process.env.DATABASE_SSL_KEY || undefined,
          cert: process.env.DATABASE_SSL_CERT || undefined,
          ca: process.env.DATABASE_SSL_CA || undefined,
          capath: process.env.DATABASE_SSL_CAPATH || undefined,
          cipher: process.env.DATABASE_SSL_CIPHER || undefined,
          rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED || true,
        },
        schema: process.env.DATABASE_SCHEMA || 'public',
      },
      tables: {
        shops: process.env.DATABASE_TABLE_SHOPS || 'shops',
      },
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      timeout: process.env.REDIS_TIME_OUT,
      keys: {
        shopsGeospatial: process.env.REDIS_KEY_SHOPS_GEOSPATIAL || 'shops:locations',
      },
    },

  },
};
