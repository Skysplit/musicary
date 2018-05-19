import axios from 'axios';
import { getUserToken } from '@app/client/utils/userData';

const client = axios.create({
  baseURL: `${process.env.APP_URL || ''}/api`,
});

client.interceptors.request.use((config) => {
  if (window) {
    const token = getUserToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default client;
