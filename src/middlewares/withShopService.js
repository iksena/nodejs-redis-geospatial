import services from '../services/index.js';
import repositories from '../repositories/index.js';
import ShopsGeospatial from '../repositories/shopsGeospatial.js';

const { ShopService } = services;
const { ShopsRepository } = repositories;

const withShopService = (req, res, next) => {
  const {
    logger, dbClient, redisClient, config,
  } = req.app.locals;

  const shopsRepository = new ShopsRepository({
    logger,
    dbClient,
    config,
  });

  const shopsGeospatialRepository = new ShopsGeospatial({
    logger,
    redisClient,
    config,
  });

  req.app.locals.shop = new ShopService({
    logger,
    shopsRepository,
    shopsGeospatialRepository,
  });

  return next();
};

export default withShopService;
