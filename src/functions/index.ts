import db from '../db';
import {
  getUserQuery,
  createUserQ,
  getAllUsersQ,
  createPostQ,
  getUsersPostWithComment,
  getAPostQ,
} from '../queries';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUND, STATUS_CODE, JWT_SECRET } from '../constants/index';
import { AppError } from '../middleware/error';

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

export type UserReturnType = {
  user_id: string;
  password?: string;
  username: string;
  email: string;
  posts?: PostT[];
};

//get user by email or userID
export const handleGetAUser = async (
  userId: string | null,
  email: string | null
) => {
  const result = await db.query(getUserQuery, [userId, email]);

  if (result.rows.length === 0) {
    throw new AppError('No user found', STATUS_CODE.UNAUTHORIZED);
  } else {
    const user = result.rows[0];
    const userWithPostsAndComments: UserReturnType = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      password: user.password,
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

//TODO: email should be unique in the databse
export const handleCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userId = uuidv4();

  const hashPassword = await bcrypt.hash(password, SALT_ROUND);
  await db.query(createUserQ, [userId, hashPassword, username, email]);

  //Get the just created user
  const data = await handleGetAUser(userId, null);
  if (data) {
    const { password, ...data_ } = data;
    const token: string = jwt.sign({ id: data.user_id }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 3,
    });
    const res = {
      token: token,
      data: data_,
    };
    return res;
  }
};

//install all packages used
export const handleLogIn = async (email: string, password: string) => {
  // get user
  const data = await handleGetAUser(null, email);
  //decrypt password
  //compare password
  if (data && data.password) {
    const compare = await bcrypt.compare(password, data.password);
    if (compare) {
      const { password, ...data_ } = data;
      const token: string = jwt.sign({ id: data.user_id }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 3,
      });
      const res = {
        token: token,
        data: data_,
      };
      return res;
    } else {
      throw new AppError('password incorrect', STATUS_CODE.BAD_REQUEST);
    }
  }
  // return user and token or error if not match
};

//handle case of no users
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

export const handleCreatePost = async (
  title: string,
  content: string,
  user_id: string
) => {
  await handleGetAUser(user_id, null);
  const create = await db.query(createPostQ, [user_id, title, content]);
  return create.rows;
};

export const handleGetPosts = async (user_id: string) => {
  await handleGetAUser(user_id, null);
  const posts = await db.query(getUsersPostWithComment, [user_id]);
  return posts.rows;
};

export const handleGetAPost = async (post_id: string) => {
  const post = await db.query(getAPostQ, [post_id]);
  if (post.rows.length === 0) {
    throw new AppError('post does not exist', STATUS_CODE.BAD_REQUEST);
  } else {
    return post;
  }
};
