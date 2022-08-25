import { ref } from 'vue';
import { auth as authApi } from '@/api';
import { useAuth } from '@/store';
import { HandledError } from '../../interfaces';

export default () => {
  const auth = useAuth();

  const loading = ref(false);

  const logout = async () => {
    loading.value = true;

    try {
      const res = await authApi.logout(auth.token.refreshToken);

      auth.logout();
    } catch (err) {
      auth.logout();
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    logout,
  };
};
