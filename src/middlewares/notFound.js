import { Router } from 'express';
import HttpErrors from 'http-errors';

const notFoundRouter = Router();

const notFoundHandler = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  return next(new HttpErrors.NotFound(`${req.method} ${req.url} not found`));
};

notFoundRouter.all('*', notFoundHandler);

export default notFoundRouter;
