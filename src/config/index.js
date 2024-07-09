import env from 'dotenv';

env.config();

export default {
  port: process.env.SERVICE_PORT || 3000,
  loggerOptions: {
    name: process.env.SERVICE_NAME || 'ms-clockin-shops',
    level: process.env.LOG_LEVEL || 'debug',
  },
  resources: {
    db: {
      collections: {
        absences: process.env.DB_ABSENCES_COLLECTION,
        employees: process.env.DB_EMPLOYEES_COLLECTION,
      },
      instances: process.env.DB_INSTANCES,
      options: process.env.DB_OPTIONS,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};
