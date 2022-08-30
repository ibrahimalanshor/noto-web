import { ref } from 'vue';
import { note as noteApi } from '@/api';

export default () => {
  const loading = ref(false);

  const deleteNote = async (id) => {
    loading.value = true;

    try {
      return await noteApi.delete(id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, deleteNote };
};
