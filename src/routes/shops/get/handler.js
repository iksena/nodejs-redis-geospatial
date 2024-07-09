const getShops = async (req, res, next) => {
  const { logger, shop } = req.app.locals;

  try {
    const response = await shop.getShops(req.query);

    res.json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default getShops;
