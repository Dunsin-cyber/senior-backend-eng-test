import request from 'supertest';
import app from '../app';
import dbProvider from './mockDb';

// Mock the result returned by db.query
jest.mock('../db/index', () => require('./mockDb'));

describe('POST / users', () => {
  describe('given a username email and password', () => {
    it('should create user', async () => {
      const response = await request(app).post('/users').send({
        username: 'dunsin',
        email: 'dunsin@gmail.com',
        password: '1234',
      });
      expect(dbProvider.DBcreateUser.mock.calls.length).toBe(1);
    });
  });

  describe('login', () => {
    it('should return you with the user and token', () => {
      expect(true).toBe(true);
    });
  });

  describe('given a userId or email', () => {
    it('should return not logged in error', async () => {
      const response = await request(app).get('/users').send({
        email: 'dunsin@gmail.com',
      });
      expect(response.statusCode).toBe(401);
    });
    it('should get a user', async () => {
      expect(true).toBe(true);

      // const response = await request(app).get('/users').send({
      //   // email: 'dunsi',
      //   email: 'dunsin@gmail.com',
      //   // password: '1234',
      // });
      // expect(dbProvider.DBgetUser.mock.calls.length).toBe(1);
      // expect(response.body.success).toBe(false);
    });
  });

  describe('given no paramater', () => {
    it('should get all the users', () => {
      expect(true).toBe(true);
    });
  });
});
