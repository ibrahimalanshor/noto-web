import { ref } from 'vue';
import { note as noteApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const body = ref({
    name: null,
    content: null,
    tagId: null,
  });
  const validation = ref();
  const loading = ref(false);

  const setBody = (note) => {
    body.value.name = note.name;
    body.value.content = note.content;
    body.value.tagId = note.tagId;
  };

  const updateNote = async (id) => {
    loading.value = true;
    validation.value = null;

    try {
      return await noteApi.update(id, {
        ...body.value,
        ...(body.value.tagId ? { tagId: body.value.tagId.id } : {}),
      });
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

  return { body, validation, loading, setBody, updateNote };
};
