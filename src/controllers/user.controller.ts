import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';
import { handleCreateUser } from '../functions/user';
const controller = {
  create: async (req: Request, res: Response) => {
    //Valldates data coming in
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        status: false,
        data: err.array(),
      });
      return;
    }
    const { username, email } = req.body;
    // const data = await handleCreateUser(username, email);

    // if (data) {
    //   res.status(STATUS_CODE.OK).json({
    //     success: true,
    //     data,
    //   });
    // }
    res.send('create works');
  },
  getAll: async (req: Request, res: Response) => {
    res.send('get all works');
  },
  createUserPost: async (req: Request, res: Response) => {
    res.send('createUserPost works');
  },
  getUserPost: async (req: Request, res: Response) => {
    res.send('get user post works');
  },
};

export default controller;
