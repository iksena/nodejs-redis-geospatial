const editShop = async (req, res, next) => {
  const { params, body, app } = req;
  const { logger, shop } = app.locals;

  try {
    const response = await shop.editShop(params.id, body);

    res.status(200).json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default editShop;
