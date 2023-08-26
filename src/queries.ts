const getUserQuery = `
SELECT users.user_id, users.password, users.username, users.email,
       posts.post_id, posts.title as post_title, posts.content as post_content,
       comments.comment_id, comments.content as comment_content
FROM users
LEFT JOIN posts ON users.user_id = posts.user_id
LEFT JOIN comments ON posts.post_id = comments.post_id
WHERE users.user_id = $1 OR users.email = $2;
`;
const createUserQ = `
INSERT INTO users (user_id, password, username, email)
VALUES ($1, $2, $3, $4);
`;

const getAllUsersQ = `
SELECT  users.user_id, users.username, users.email FROM users
`;

const createPostQ = `
INSERT INTO posts (user_id, title, content)
VALUES ($1, $2, $3)
RETURNING post_id, user_id, title, content`;

const createCommentQ = `
INSERT INTO comments (post_id, user_id, content)
VALUES ($1, $2, $3)
RETURNING comment_id, post_id, user_id, content
`;

const getUsersPostWithComment = `
SELECT
  p.*,
  c.comment_id,
  c.user_id AS comment_user_id,
  c.content AS comment_content
FROM posts p
LEFT JOIN (
  SELECT comment_id, post_id, user_id, content
  FROM comments
) c ON p.post_id = c.post_id
WHERE p.user_id = $1;
`;

const getAPostQ = `
SELECT * FROM posts WHERE post_id = $1;
`;
export {
  getUserQuery,
  createUserQ,
  getAllUsersQ,
  createPostQ,
  createCommentQ,
  getUsersPostWithComment,
  getAPostQ,
};
