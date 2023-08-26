import { body, param, validationResult } from 'express-validator';

// Middleware to validate user creation input
export const validateUserData = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validatePostData = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  param('id').isUUID().withMessage('Invalid userId fornmat'),
];

export const validateLoginData = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateGetData = [
  param('id').isUUID().withMessage('Invalid userId fornmat'),
];

export const validateCreateComment = [
  body('content').notEmpty().withMessage('comment is empty'),
  param('postId').isUUID().withMessage('invalid id format'),
];

export const validateGetComment = [
  param('postId').isUUID().withMessage('Invalid userId fornmat'),
];
