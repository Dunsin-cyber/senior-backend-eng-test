const getUserQuery = `
SELECT users.user_id, users.username, users.email,
       posts.post_id, posts.title as post_title, posts.content as post_content,
       comments.comment_id, comments.content as comment_content
FROM users
LEFT JOIN posts ON users.user_id = posts.user_id
LEFT JOIN comments ON posts.post_id = comments.post_id
WHERE users.user_id = $1;
`;
const createUserQ = `
INSERT INTO users (user_id, username, email)
VALUES ($1, $2, $3);
`;

const getAllUsersQ = `
SELECT  users.user_id, users.username, users.email FROM users
`;

export { getUserQuery, createUserQ, getAllUsersQ };
