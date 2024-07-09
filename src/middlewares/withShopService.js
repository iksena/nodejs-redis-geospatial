import services from '../services/index.js';
import repositories from '../repositories/index.js';

const { ShopService } = services;
const { ShopsRepository } = repositories;

const withShopService = (req, res, next) => {
  const { logger, mongo: { db }, config } = req.app.locals;

  const shopsRepository = new ShopsRepository({
    logger,
    table: db.collection(config.resources.db.table.shops),
    config,
  });

  req.app.locals.Shop = new ShopService({
    logger,
    shopsRepository,
  });

  return next();
};

export default withShopService;
