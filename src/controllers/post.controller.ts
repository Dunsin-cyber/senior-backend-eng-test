import { Request, Response } from 'express';

const controller = {
  addComment: async (req: Request, res: Response) => {
    res.send('add comment works');
  },
  getComments: async (req: Request, res: Response) => {
    res.send('get comment works');
  },
};

export default controller;
