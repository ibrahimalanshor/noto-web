import { reactive, ref } from 'vue';
import { profile as profileApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const error = ref();
  const loading = ref(false);
  const body = reactive({
    name: null,
    password: null,
    password_confirmation: null,
  });

  const setBody = (val) => {
    body.name = val.name;
  };

  const updateProfile = async () => {
    loading.value = true;
    error.value = null;

    try {
      return await profileApi.update(body);
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

  return { error, loading, body, setBody, updateProfile };
};
