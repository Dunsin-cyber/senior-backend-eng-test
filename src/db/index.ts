import { Pool } from 'pg';
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../constants/index';
import { AppError } from '../middleware/error';

import {
  getUserQuery,
  createUserQ,
  getAllUsersQ,
  createPostQ,
  getUsersPostWithComment,
  getAPostQ,
  getPostComments,
  optimizer,
  createCommentQ,
} from '../queries';

const db = new Pool({
  user: POSTGRES_USER,
  host:
    process.env.NODE_ENV === 'test'
      ? 'localhost'
      : 'senior-backend-eng-test_db_1', //VM uses underscore
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: 5432, // Default PostglsreSQL port
});

async function createTables() {
  try {
    // Enable the uuid-ossp extension
    await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // Creates Tables
    const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS Users (
          user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          password VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Posts (
          post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES Users(user_id),
          title VARCHAR(255) NOT NULL,
          content TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Comments (
          comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          post_id UUID REFERENCES Posts(post_id),
          user_id UUID REFERENCES Users(user_id),
          content TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `;
    await db.query(createTablesQuery);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    new AppError('Error creating tables:', 500);
  }
}

//Establish conection to the db.
const checkDBConnection = () => {
  db.connect()
    .then(() => {
      console.log('Connected to the database, creating tables...');
      createTables();
    })
    .catch((error) => {
      console.error(
        'Error connecting to the database: retrying in 5 seconds.....',
        error
      );

      setTimeout(checkDBConnection, 5000);
    });
};

if (process.env.NODE_ENV !== 'test') {
  checkDBConnection();
}

const database = {
  //--------------USERS--------------------------
  //---------------------------------------------
  //---------------------------------------------
  //--------------USERS--------------------------

  DBgetUser: async (userId: string | null, email: string | null) => {
    return await db.query(getUserQuery, [userId, email]);
  },

  DBcreateUser: async (
    userId: string,
    hashPassword: string,
    username: string,
    email: string
  ) => {
    return await db.query(createUserQ, [userId, hashPassword, username, email]);
  },

  DBgetAllUsers: async () => {
    return await db.query(getAllUsersQ);
  },

  //--------------POSTS--------------------------
  //---------------------------------------------
  //---------------------------------------------
  //--------------POSTS--------------------------

  DBcreatePost: async (title: string, content: string, user_id: string) => {
    return await db.query(createPostQ, [user_id, title, content]);
  },

  DBgetPosts: async (user_id: string) => {
    return await db.query(getUsersPostWithComment, [user_id]);
  },

  DBgetAPost: async (post_id: string) => {
    return await db.query(getAPostQ, [post_id]);
  },

  DBoptimize: async () => {
    return await db.query(optimizer);
  },

  //--------------COMMENTS--------------------------
  //---------------------------------------------
  //---------------------------------------------
  //--------------COMMENTS--------------------------

  DBgetPostComments: async (post_id: string) => {
    return await db.query(getPostComments, [post_id]);
  },

  DBcreateComment: async (
    user_id: string,
    post_id: string,
    content: string
  ) => {
    return db.query(createCommentQ, [post_id, user_id, content]);
  },
};

export default database;
