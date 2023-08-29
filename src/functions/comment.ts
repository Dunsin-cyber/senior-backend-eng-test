import { handleGetAUser, handleGetAPost } from '.';
import dbProvider from '../db/dbProvider';

export const handleCreateComment = async (
  user_id: string,
  post_id: string,
  content: string
) => {
  await handleGetAUser(user_id, null);
  await handleGetAPost(post_id);
  const create: any = await dbProvider.DBcreateComment(
    post_id,
    user_id,
    content
  );
  return create.rows;
};
