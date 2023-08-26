import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';

const controller = {
  addComment: async (req: Request, res: Response) => {
    res.send(' works');
  },
  getComment: async (req: Request, res: Response) => {
    res.send('get comment works');
  },
};

export default controller;
