import mongodb from 'mongodb';

import connectMongoDb from './connectMongoDb.js';
import config from '../../config/index.js';

/**
 * dbInitialization
 * @param {object} app - app
 */
const dbInitialization = async (app) => {
  const mongo = await connectMongoDb(mongodb, config.resources.db, app.locals.logger);

  Object.assign(app.locals, { mongo });
};

export default [dbInitialization];
