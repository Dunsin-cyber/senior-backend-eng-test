import { body, validationResult } from 'express-validator';

// Middleware to validate user creation input
export const validateUserData = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
];
