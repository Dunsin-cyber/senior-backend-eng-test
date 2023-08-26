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
WITH inserted AS (
  INSERT INTO Posts (user_id, title, content)
  VALUES ($1, $2, $3)
  RETURNING post_id, user_id, title, content, created_at
)
SELECT 
  inserted.*, 
  Users.username, 
  Users.email, 
  Users.created_at AS user_created_at
FROM inserted
JOIN Users ON inserted.user_id = Users.user_id;
`;

const createCommentQ = `
INSERT INTO Comments (post_id, user_id, content)
VALUES ($1, $2, $3)
RETURNING comment_id, post_id, user_id, content, created_at
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
const getPostComments = `
SELECT * FROM Comments
WHERE post_id = $1;
`;

const optimizer = `
WITH RankedPosts AS (
  SELECT
    p.*,
    c.content AS comment_content,
    ROW_NUMBER() OVER (PARTITION BY p.user_id ORDER BY c.created_at DESC) AS comment_rank
  FROM Posts p
  LEFT JOIN Comments c ON p.post_id = c.post_id
),
UserPostCounts AS (
  SELECT
    u.user_id,
    u.username,
    COUNT(p.post_id) AS post_count
  FROM Users u
  LEFT JOIN Posts p ON u.user_id = p.user_id
  GROUP BY u.user_id, u.username
)
SELECT
  upc.user_id,
  upc.username,
  rp.title AS post_title,
  rp.comment_content AS latest_comment
FROM UserPostCounts upc
JOIN RankedPosts rp ON upc.user_id = rp.user_id AND rp.comment_rank = 1
ORDER BY upc.post_count DESC
LIMIT 3;`;
export {
  getUserQuery,
  createUserQ,
  getAllUsersQ,
  createPostQ,
  createCommentQ,
  getUsersPostWithComment,
  getAPostQ,
  getPostComments,
  optimizer,
};
