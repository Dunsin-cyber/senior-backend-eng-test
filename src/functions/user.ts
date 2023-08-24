import db from '../db';
import { getUserQuery, createUserQ, getAllUsersQ } from '../queries';
import { v4 as uuidv4 } from 'uuid';

type PostT = {
  post_id: string;
  title: string;
  content: string;
  comments: CommentType[];
};

type CommentType = {
  comment_id: string;
  content: string;
};

type UserReturnType = {
  user_id: string;
  username: string;
  email: string;
  posts?: PostT[];
};

//TODO: email should be unique in the databse
export const handleCreateUser = async (username: string, email: string) => {
  const userId = uuidv4();

  await db.query(createUserQ, [userId, username, email]);

  //Get the just created user
  const data = await handleGetAUser(userId);

  return data;
};

export const handleGetAUser = async (userId: string) => {
  const result = await db.query(getUserQuery, [userId]);

  if (result.rows.length > 0) {
    const user = result.rows[0];
    const userWithPostsAndComments: UserReturnType = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      posts: [],
    };

    // Organize posts and comments under the user object
    result.rows.forEach((row) => {
      if (row.post_id) {
        const post: PostT = {
          post_id: row.post_id,
          title: row.post_title,
          content: row.post_content,
          comments: [],
        };
        if (row.comment_id) {
          post.comments.push({
            comment_id: row.comment_id,
            content: row.comment_content,
          });
        }
        userWithPostsAndComments.posts?.push(post);
      }
    });

    return userWithPostsAndComments;
  }
};

export const handleGetAllUsers = async () => {
  const result = await db.query(getAllUsersQ);
  const users: UserReturnType[] = [];
  if (result.rows) {
    const temp = result.rows;
    temp.forEach((res) => {
      users.push({
        user_id: res.user_id,
        username: res.username,
        email: res.email,
      });
    });
  }

  return users;
};
