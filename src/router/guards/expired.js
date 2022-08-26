import { useAuth } from '@/store';
import { auth as authApi } from '@/api';

export default async (to, from) => {
  const auth = useAuth();

  if (auth.isLogin) {
    try {
      if (new Date() > new Date(auth.decoded.exp * 1000)) {
        const res = await authApi.refreshToken(auth.token.refreshToken);

        auth.refreshToken(res.data.accessToken);
      }
    } catch (err) {
      auth.logout();

      return { name: 'Login' };
    }
  }
};
