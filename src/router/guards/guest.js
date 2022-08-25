import { useAuth } from '@/store';

export default (to, from) => {
  const auth = useAuth();

  if (to.matched.some((route) => route.meta.requireGuest) && auth.isLogin) {
    return { name: 'Home' };
  }
};
