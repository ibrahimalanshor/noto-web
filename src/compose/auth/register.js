import { reactive, ref } from 'vue';
import { auth as authApi } from '@/api';
import { useAuth } from '@/store';
import { HandledError } from '@/interfaces';

export default () => {
  const auth = useAuth();

  const validation = ref();
  const credential = reactive({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  });
  const loading = ref(false);

  const register = async () => {
    loading.value = true;
    validation.value = null;

    try {
      const res = await authApi.register(credential);

      auth.login(res.data.token.accessToken, res.data.token.refreshToken);
    } catch (err) {
      if (err.response) {
        const { status, errors } = err.response.data;

        if (status === 422) {
          validation.value = errors;
        }

        if ([422, 409].includes(status)) {
          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    validation,
    credential,
    loading,
    register,
  };
};
