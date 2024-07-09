const getShopsById = async (req, res, next) => {
  const { logger, shop } = req.app.locals;
  const { params } = req;

  try {
    const response = await shop.getShopById(params.id);

    res.json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default getShopsById;
