const getUserQuery = `
SELECT u.user_id, u.password, u.username, u.email,
       p.post_id, p.title as post_title, p.content as post_content,
       c.comment_id, c.content as comment_content, c.created_at as comment_created_at
FROM Users u
LEFT JOIN Posts p ON u.user_id = p.user_id
LEFT JOIN Comments c ON p.post_id = c.post_id AND c.user_id = u.user_id
WHERE u.user_id = $1 OR u.email = $2;
`;
const createUserQ = `
INSERT INTO Users (user_id, password, username, email)
VALUES ($1, $2, $3, $4);
`;

const getAllUsersQ = `
SELECT  users.user_id, users.username, users.email, users.created_at FROM users
`;

const createPostQ = `
INSERT INTO Posts (user_id, title, content)
VALUES ($1, $2, $3)
RETURNING post_id, user_id, title, content`;

const createCommentQ = `
INSERT INTO Comments (post_id, user_id, content)
VALUES ($1, $2, $3)
RETURNING comment_id, post_id, user_id, content
`;

const getUsersPostWithComment = `
SELECT
  p.*,
  c.comment_id,
  c.user_id AS comment_user_id,
  c.content AS comment_content
FROM Posts p
LEFT JOIN (
  SELECT comment_id, post_id, user_id, content, created_at
  FROM Comments
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
