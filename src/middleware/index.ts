import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import db from '../db';
import { JWT_SECRET, STATUS_CODE } from '../constants/index';
import { AppError, handleError } from './error';
import { handleGetAUser } from '../functions';
import { UserReturnType } from '../functions';

declare module 'express-serve-static-core' {
  interface Request {
    user: UserReturnType | any;
  }
}

const middleware = {
  verifyBearer: handleError(
    async (req: Request, res: Response, next: NextFunction) => {
      // return new Promise((resolve, reject) => {
      const { authorization } = req.headers;
      //authorization === Bearer ewefwegwrherhe
      if (!authorization) {
        throw new AppError('you must be logged in', STATUS_CODE.FORBIDDEN);
      }

      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new AppError('Unauthorized', STATUS_CODE.UNAUTHORIZED);
      }

      // const verify = jwt.verify(token, JWT_SECRET)
      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          throw new AppError(err.message, STATUS_CODE.BAD_REQUEST);
        } else {
          const { id }: any = payload;
          const data = handleGetAUser(id, null);
          if (!data) {
            throw new AppError('user does not exist', STATUS_CODE.UNAUTHORIZED);
          } else {
            req.user = data;
            next();
          }
        }
      });
    }
  ),
};

export default middleware;
