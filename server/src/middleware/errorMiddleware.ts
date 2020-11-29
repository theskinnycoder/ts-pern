import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response
} from 'express';

import { __prod__ } from '../utils/constants';
// import { HandlerArgsType } from '../utils/types';

export const notFound: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const customErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: __prod__ ? null : err.stack
  });
};
