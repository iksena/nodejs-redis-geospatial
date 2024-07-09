const createShop = async (req, res, next) => {
  const { logger, shop } = req.app.locals;

  try {
    const response = await shop.createShop(req.body);

    res.status(201).json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default createShop;
