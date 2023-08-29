import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
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
  verifyBearer: async (req: Request, res: Response, next: NextFunction) => {
    // return new Promise((resolve, reject) => {
    try {
      const { authorization } = req.headers;
      //authorization === Bearer ewefwegwrherhe
      if (!authorization) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({
          success: false,
          data: 'you must be logged in',
        });
      }

      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({
          success: false,
          data: 'Unauthorized',
        });
      }

      // const verify = jwt.verify(token, JWT_SECRET)
      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
          return res.status(STATUS_CODE.UNAUTHORIZED).json({
            success: false,
            data: err.message,
          });
        } else {
          const { id }: any = payload;
          const data = await handleGetAUser(id, null);
          // console.log('data', data);
          if (!data) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({
              success: false,
              data: 'user does not exist',
            });
          } else {
            req.user = data;
            next();
          }
        }
      });
    } catch (err) {
      throw new AppError(err as string, STATUS_CODE.UNAUTHORIZED);
    }
  },
};

export default middleware;
