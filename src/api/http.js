import axios from 'axios';
import router from '@/router';
import { useAuth } from '@/store';
import authApi from './auth.js';

export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  instance.interceptors.request.use(async (config) => {
    const auth = useAuth();

    if (auth.isLogin) {
      try {
        if (auth.expired) {
          const res = await authApi.refreshToken(auth.token.refreshToken);

          auth.refreshToken(res.data.accessToken);
        }

        config.headers.authorization = auth.token.accessToken;
      } catch (err) {
        auth.logout();

        router.push({ name: 'Login' });
      }
    }

    return config;
  });

  return instance;
};
