import db from '../db';
import { handleGetAUser, handleGetAPost } from '.';
import { createCommentQ } from '../queries';

export const handleCreateComment = async (
  user_id: string,
  post_id: string,
  content: string
) => {
  await handleGetAUser(user_id, null);
  await handleGetAPost(post_id);
  const create = await db.query(createCommentQ, [post_id, user_id, content]);
  return create.rows;
};
