import services from '../services/index.js';
import repositories from '../repositories/index.js';

const { ShopService } = services;
const { ShopsRepository } = repositories;

const withShopService = (req, res, next) => {
  const { logger, dbClient, config } = req.app.locals;

  const shopsRepository = new ShopsRepository({
    logger,
    dbClient,
    config,
  });

  req.app.locals.shop = new ShopService({
    logger,
    shopsRepository,
  });

  return next();
};

export default withShopService;
