import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUND, STATUS_CODE, JWT_SECRET } from '../constants/index';
import { AppError } from '../middleware/error';
import dbProvider from '../db/dbProvider';

type PostT = {
  post_id: string;
  title: string;
  content: string;
  comments: CommentType[];
  created_at: string;
};

type CommentType = {
  comment_id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
};

export type UserReturnType = {
  user_id: string;
  password?: string;
  username: string;
  created_at: string;
  email: string;
  posts?: PostT[];
};

type PostReturnT = {
  post: PostT;
  comments: CommentType[];
};

export const handleGetAUser = async (
  userId: string | null,
  email: string | null
) => {
  const result: any = await dbProvider.DBgetUser(userId, email);

  if (result.rows.length === 0) {
    throw new AppError('No user found', STATUS_CODE.UNAUTHORIZED);
  } else {
    const user = result.rows[0];
    const userWithPostsAndComments: UserReturnType = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      password: user.password,
      posts: [],
    };
    // console.log(result.rows);
    // It returns this same user nwith different product,
    // so what i will do is the first array, i will use it to pick the user,
    //then  ater on map throught the array to get the product
    return userWithPostsAndComments;
  }
};

// const getUserFnc = async (pos) => {};

//TODO: email should be unique in the databse
export const handleCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userId = uuidv4();

  const hashPassword = await bcrypt.hash(password, SALT_ROUND);
  await dbProvider.DBcreateUser(userId, hashPassword, username, email);

  //Getconst the just created user
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
  const result: any = await dbProvider.DBgetAllUsers();
  const users: UserReturnType[] = [];
  if (result.rows) {
    const temp = result.rows;
    temp.forEach(
      (res: { user_id: any; username: any; email: any; created_at: any }) => {
        users.push({
          user_id: res.user_id,
          username: res.username,
          email: res.email,
          created_at: res.created_at,
        });
      }
    );
  }

  return users;
};

//--------------POSTS--------------------------
//---------------------------------------------
//---------------------------------------------
//--------------POSTS--------------------------

export const handleCreatePost = async (
  title: string,
  content: string,
  user_id: string
) => {
  await handleGetAUser(user_id, null);
  const create: any = await dbProvider.DBcreatePost(user_id, title, content);
  return create.rows;
};

export const handleGetPosts = async (user_id: string) => {
  await handleGetAUser(user_id, null);
  const posts: any = await dbProvider.DBgetPosts(user_id);

  const getAll = async () => {
    return Promise.all(posts.rows.map((c: any) => handleGetAPost(c.post_id)));
  };

  return getAll();
};

export const handleGetAPost = async (post_id: string) => {
  const post: any = await dbProvider.DBgetAPost(post_id);
  if (post.rows.length === 0) {
    throw new AppError('post does not exist', STATUS_CODE.BAD_REQUEST);
  } else {
    const comments: any = await dbProvider.DBgetPostComments(post_id);

    const postWithComments: PostReturnT = {
      post: post.rows[0],
      comments: comments.rows,
    };
    return postWithComments;
  }
};

export const handleOptimize = async () => {
  const res: any = await dbProvider.DBoptimize();

  return res.rows;
};
