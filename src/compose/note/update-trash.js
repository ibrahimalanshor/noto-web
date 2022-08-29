import { ref } from 'vue';
import { note as noteApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const loading = ref(false);

  const updateNoteTrash = async (id, isTrash) => {
    loading.value = true;

    try {
      return await noteApi.updateTrash(id, isTrash);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, updateNoteTrash };
};
