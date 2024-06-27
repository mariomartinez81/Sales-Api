import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

export default function validatorHandler(schema: any, property: keyof Request) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
