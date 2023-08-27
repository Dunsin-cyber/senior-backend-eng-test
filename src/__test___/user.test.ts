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

describe('POST / users', () => {
  it('should return the created user', async () => {
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

describe('GET / users', () => {
  it('should return a user', async () => {
    const userId = null;
    const email = 'test@examplr.com';

    // Call the function
    const user = await handleGetAUser(userId, email);

    // Assertions
    expect(user).toBeDefined();
    expect(user.user_id).toBeDefined();
    expect(user.username).toEqual('testuser');
    expect(user.email).toEqual('test@examplr.com');
    expect(user.posts).toHaveLength(0);
  });

  it('should return no user found', async () => {
    const userId = null;
    const user = await handleGetAUser(userId, 'wrong@email.com');

    expect(user).toHaveLength(0);
    // toThrowError('No user found');
  });
});

afterAll(async () => {
  await db.end(); // Close the database connection
});
