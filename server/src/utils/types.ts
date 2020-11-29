import { NextFunction, Request, Response } from 'express';

type RequestParamsType = {
  params: {
    id: string;
  };
};

export type HandlerArgsType = {
  err: Error;
  req: Request & RequestParamsType;
  res: Response;
  next: NextFunction;
};
