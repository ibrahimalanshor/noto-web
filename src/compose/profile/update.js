import { reactive, ref } from 'vue';
import { profile as profileApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const validation = ref();
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
    validation.value = null;

    try {
      return await profileApi.update(body);
    } catch (err) {
      if (err.response) {
        const { status, errors } = err.response.data;

        if (status === 422) {
          validation.value = errors;
        }

        if ([422].includes(status)) {
          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { validation, loading, body, setBody, updateProfile };
};
