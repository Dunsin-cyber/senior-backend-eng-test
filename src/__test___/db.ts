// __mocks__/db.ts
export const db = {
  query: jest.fn(),
  connect: jest.fn(),
  end: jest.fn(),
};
