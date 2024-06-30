import { ValidationError } from 'sequelize';
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  next(err);
}

function ormErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

function boomErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export { logErrors, ormErrorHandler, boomErrorHandler, errorHandler };
