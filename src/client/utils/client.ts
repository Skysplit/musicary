import axios from 'axios';
import { getUserToken, TOKEN_KEY } from '@app/client/utils/userData';
import { Request } from 'express';

const client = axios.create({
  baseURL: `${process.env.APP_URL || ''}/api`,
});

client.interceptors.request.use((config) => {
  if (global.window) {
    const token = getUserToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export const getHeaders = (req: Request) => {
  const token: string = req ? req.cookies[TOKEN_KEY] : null;

  return {
    Authorization: token ? `Bearer ${token}` : null,
  };
};

export default client;
