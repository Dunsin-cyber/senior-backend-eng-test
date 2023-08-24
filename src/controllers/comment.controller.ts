import { Request, Response } from 'express';

const controller = {
  addComment: async (req: Request, res: Response) => {
    res.send(' works');
  },
};

export default controller;
