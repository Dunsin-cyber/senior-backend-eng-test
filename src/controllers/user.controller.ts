import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';
import {
  handleCreateUser,
  handleGetAUser,
  handleGetAllUsers,
} from '../functions/user';
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
    const data = await handleCreateUser(username, email);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  getAUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await handleGetAUser(id);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    const data = await handleGetAllUsers();

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  createUserPost: async (req: Request, res: Response) => {
    res.send('createUserPost works');
  },
  getUserPost: async (req: Request, res: Response) => {
    res.send('get user post works');
  },
};

export default controller;
