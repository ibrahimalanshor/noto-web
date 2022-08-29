import { ref } from 'vue';
import { note as noteApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const note = ref();
  const loading = ref(true);

  const findNote = async (id) => {
    loading.value = true;

    try {
      const res = await noteApi.find(id);

      note.value = res.data;
    } catch (err) {
      if (err.response) {
        if ([403, 404].includes(err.response.data.status)) {
          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { note, loading, findNote };
};
