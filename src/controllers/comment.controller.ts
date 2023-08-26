import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../constants/index';
import { handleCreateComment } from '../functions/comment';

const controller = {
  addComment: async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        data: err.array(),
      });
      return;
    }

    const { content } = req.body;
    const id = req.params.postId;
    const { user_id } = await (req as any).user;
    const data = await handleCreateComment(user_id, id, content);

    if (data) {
      res.status(STATUS_CODE.OK).json({
        success: true,
        data,
      });
    }
  },
};

export default controller;
