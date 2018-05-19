import request, { SuperTest, Test } from 'supertest';
import createApp from '@server/createApp';
import User from '@server/module/user/user.model';
import { Application } from 'express';
import createJWT from '@server/utils/createJWT';

describe('/api/users', () => {
  let app: Application;
  let user: User;
  let req: SuperTest<Test>;

  beforeAll(async () => {
    app = await createApp();

    user = User.create({
      email: 'test@example.com',
      password: 'Secret99',
    });

    await user.save();
  });

  beforeEach(() => {
    req = request(app);
  });

  describe('GET /me', () => {
    test('should access user profile', async () => {
      const token = createJWT(user.toJSON());
      const response = await request(app)
        .get('/api/users/me')
        .set({ Authorization: `Bearer ${token}` });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        JSON.parse(JSON.stringify(user)),
      );
    });

    describe('when no bearer token is provided', () => {
      test('should forbid profile access', async () => {
        const response = await req.get('/api/users/me');

        expect(response.status).toEqual(401);
      });
    });
  });

  describe('POST /login', () => {
    test('should respond with JWT token', async () => {
      const response = await req.post('/api/users/login').send({
        email: 'test@example.com',
        password: 'Secret99',
      });

      expect(response.body).toEqual({
        success: true,
        token: expect.any(String),
      });
      expect(response.status).toEqual(200);
    });

    describe('when no credentials are provided', () => {
      test('should display missing credentials', async () => {
        const response = await req.post('/api/users/login');
        expect(response.status).toEqual(422);
        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when wrong password is provided', () => {
      test('should display wrong credentials', async () => {
        const response = await req.post('/api/users/login').send({
          email: 'test@example.com',
          password: 'Secret1',
        });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when wrong email is provided', () => {
      test('should display wrong credentials', async () => {
        const response = await req.post('/api/users/login').send({
          email: 'wrong@example.com',
          password: 'Secret99',
        });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchSnapshot();
      });
    });
  });

});
