import dotenv from 'dotenv-safe';
dotenv.config();
import { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';

export const PORT = process.env.PORT || 3000;
// STATUS CODE

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PRECONDITION_FAILED: 412,
  UNSUPPORTED_MEDIA_TYPE: 415,
  INTERNAL_SERVER_ERROR: 500,
};

export const TIMEOUT = 10000;
export const JWT_SECRET: Secret = 'secret';
export const SALT_ROUND = 10;
export const NODE_ENV = process.env.NODE_ENV;

//DATABASE VAR
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_DB = process.env.POSTGRES_DB;
