// Extend the Request interface to add a 'user' property
import { UserReturnType } from './src/functions/index';

declare global {
  namespace Express {
    interface Request {
      user: UserReturnType;
    }
  }
}
