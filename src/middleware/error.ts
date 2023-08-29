// import { STATUS_CODE } from 'constants/index'
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class AppError extends Error {
  statusCode!: number;
  isOperational: boolean;

  constructor(message: string, err: any) {
    // console.log(message);
    super(message);
    this.statusCode = err;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError =
  (
    fn: (
      arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg1: Response<any, Record<string, any>>,
      arg2: NextFunction
    ) => any
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
