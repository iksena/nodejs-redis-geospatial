const deleteShopById = async (req, res, next) => {
  const { logger, shop } = req.app.locals;
  const { params } = req;

  try {
    await shop.deleteShopById(params.id);

    res.sendStatus(204);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default deleteShopById;
