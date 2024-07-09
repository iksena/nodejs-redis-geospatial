import Express from 'express';
import BodyParser from 'body-parser';
import Bunyan from 'bunyan';
import CORS from 'cors';

import config from './config/index.js';
import middlewares from './middlewares/index.js';
import routes from './routes/index.js';
import initializations from './server/initializations/index.js';
import deinitializations from './server/deinitializations/index.js';

const { port, loggerOptions } = config;
const { errorMiddleware, notFoundMiddleware } = middlewares;

const logger = Bunyan.createLogger(loggerOptions);

const intialize = async (app) => {
  try {
    await initializations.reduce((p, fn) => p.then(() => fn(app)), Promise.resolve());
  } catch (error) {
    logger.error({ error }, 'Initializations failed');
    throw error;
  }
};

const stop = async (signal, app) => {
  logger.info({ event: 'shutdown', signal });
  await deinitializations.reduce((p, fn) => p.then(async () => {
    try {
      await fn(app);
    } catch (error) {
      this.logger.error({ error }, 'Deinitializations failed');
    }
  }), Promise.resolve());
  this.server.close();
};

const start = async () => {
  const app = Express();

  app.use(CORS());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.locals.logger = logger;
  app.locals.config = config;

  routes.forEach((route) => app.use(route));

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  await intialize(app);
  app.listen(port, () => logger.info(`Listening to port ${port}`));
};

start();
