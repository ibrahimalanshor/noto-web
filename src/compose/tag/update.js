import { reactive, ref } from 'vue';
import { tag as tagApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const body = ref({
    name: null,
    color: null,
  });
  const validation = ref();
  const loading = ref(false);

  const setBody = (val) => {
    body.value = val;
  };

  const resetBody = () => {
    body.value = {
      name: null,
      color: null,
    };
  };

  const resetValidation = () => {
    validation.value = null;
  };

  const updateTag = async (id) => {
    loading.value = true;

    resetValidation();

    try {
      return await tagApi.update(id, body.value);
    } catch (err) {
      if (err.response) {
        const { status, errors } = err.response.data;

        if (status === 422) {
          validation.value = errors;

          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    body,
    validation,
    loading,
    setBody,
    resetBody,
    resetValidation,
    updateTag,
  };
};
