import { reactive, ref } from 'vue';
import { auth as authApi } from '@/api';
import { useAuth } from '@/store';
import { HandledError } from '../../interfaces';

export default () => {
  const auth = useAuth();

  const error = ref();
  const credential = reactive({
    email: null,
    password: null,
  });
  const loading = ref(false);

  const login = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await authApi.login(credential);

      auth.login(res.data.token.accessToken, res.data.token.refreshToken);
    } catch (err) {
      if (err.response) {
        error.value = err.response.data;

        if ([422, 401].includes(err.response.data.status)) {
          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    credential,
    loading,
    login,
  };
};
