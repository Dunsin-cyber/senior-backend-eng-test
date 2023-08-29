import {jest} from '@jest/globals'
const mockDb = {
  DBgetUser: jest.fn(),
  DBcreateUser: jest.fn(),
  DBgetAllUsers: jest.fn(),
  DBcreatePost: jest.fn(),
  DBgetPosts: jest.fn(),
  DBgetAPost: jest.fn(),
  DBgetPostComments: jest.fn(),
  DBoptimize: jest.fn(),
  DBcreateComment: jest.fn(),
  end: jest.fn(),
};

export default mockDb;
