/**
 * database close connection
 * @param {object} app - express app
 */
const disconnectMongoDb = async (app) => {
  const { locals: { logger, mongo } } = app;
  logger.info('Closing connection to mongoDb...');
  await mongo.client.close();
  logger.info('Success closing connection to mongoDb');
  await app.locals.mongo.client.close();
};

export default disconnectMongoDb;
