import { handleGetAUser, handleCreateUser } from '../functions';
import { db } from './db';

// Mock the result returned by db.query
const mockResult = {
  rows: [
    {
      user_id: 'd1d0d673-4607-4b23-b9ba-cf3a73852bee',
      username: 'testuser',
      email: 'test@example.com',
      created_at: new Date(),
      password: 'hashed_password',
      posst: [],
    },
  ],
};

describe('handleCreateUser', () => {
  it('should return the created user', async () => {
    // db.query = jest.fn().mockResolvedValue(mockResult);

    const username = 'testuser';
    const email = 'test@examplr.com';
    const password = 'password';
    const user = await handleCreateUser(username, email, password);

    expect(user).toBeDefined();
    if (user) {
      expect(user.token).toBeDefined();
      expect(user.data.user_id).toBeDefined();
      expect(user.data.username).toEqual('testuser');
      expect(user.data.email).toEqual('test@examplr.com');
      expect(user.data.created_at).toBeDefined();
    }
  });
});

// describe('handleGetAUser', () => {
//   it('should return a user with posts and comments', async () => {
//     // Mock db.query function
//     db.query = jest.fn().mockResolvedValue(mockResult);

//     const userId = 'd1d0d673-4607-4b23-b9ba-cf3a73852bee';
//     const email = null;

//     // Call the function
//     const user = await handleGetAUser(userId, email);

//     // Assertions
//     expect(user).toBeDefined();
//     expect(user.user_id).toEqual('d1d0d673-4607-4b23-b9ba-cf3a73852bee');
//     expect(user.username).toEqual('testuser');
//     expect(user.email).toEqual('test@example.com');
//     expect(user.posts).toHaveLength(0);
//   });

//   //like no user found
// });

afterAll(async () => {
  await db.end(); // Close the database connection
});
