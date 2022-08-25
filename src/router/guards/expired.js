import { useAuth } from '@/store';

export default async (to, from) => {
  const auth = useAuth();

  if (auth.isLogin) {
    if (auth.expired) {
      try {
        const res = await authApi.refreshToken(auth.token.refreshToken);

        auth.refreshToken(res.data.refreshToken);
      } catch (err) {
        auth.logout();

        return { name: 'Login' };
      }
    }
  }
};
