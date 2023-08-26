import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';
import { handleOptimize } from '../functions/index';

const controller = {
  optimize: async (req: Request, res: Response) => {
    const data = await handleOptimize();

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data: data,
      });
    }
  },
};

export default controller;
