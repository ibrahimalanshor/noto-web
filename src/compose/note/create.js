import { ref } from 'vue';
import { note as noteApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const body = ref({
    name: null,
    content: null,
  });
  const validation = ref();
  const loading = ref(false);

  const resetBody = () => {
    body.value = {
      name: null,
      content: null,
    };
  };

  const resetValidation = () => {
    validation.value = null;
  };

  const createNote = async () => {
    loading.value = true;

    resetValidation();

    try {
      return await noteApi.create(body.value);
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

  return { body, validation, loading, resetBody, resetValidation, createNote };
};
