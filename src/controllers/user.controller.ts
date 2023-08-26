import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';
import {
  handleCreateUser,
  handleGetAUser,
  handleGetAllUsers,
  handleCreatePost,
  handleLogIn,
  handleGetPosts,
} from '../functions/index';

const controller = {
  create: async (req: Request, res: Response) => {
    //Valldates data coming in
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        data: err.array(),
      });
      return;
    }
    const { username, email, password } = req.body;
    const data = await handleCreateUser(username, email, password);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  logIn: async (req: Request, res: Response) => {
    //Valldates data coming in
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        data: err.array(),
      });
      return;
    }
    const { email, password } = req.body;
    const data = await handleLogIn(email, password);
    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  getAUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await handleGetAUser(id, null);

    if (data) {
      const { password, ...data_ } = data;
      res.status(STATUS_CODE.OK).json({
        success: true,
        data: data_,
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
    //Valldates data coming in
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        data: err.array(),
      });
      return;
    }
    const { title, content } = req.body;
    const { id } = req.params;
    const data = await handleCreatePost(title, content, id);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  getUserPost: async (req: Request, res: Response) => {
    //Valldates data coming in
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        data: err.array(),
      });
      return;
    }

    const { id } = req.params;
    const data = await handleGetPosts(id);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
  optimize: async (req: Request, res: Response) => {
    res.send('optimizer');
  },
};

export default controller;
