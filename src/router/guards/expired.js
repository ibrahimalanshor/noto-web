import { useAuth } from '@/store';

export default async (to, from) => {
  const auth = useAuth();

  if (auth.isLogin) {
    try {
      if (auth.expired) {
        const res = await authApi.refreshToken(auth.token.refreshToken);

        auth.refreshToken(res.data.refreshToken);
      }
    } catch (err) {
      auth.logout();

      return { name: 'Login' };
    }
  }
};
