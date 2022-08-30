import { ref } from 'vue';
import { note as noteApi } from '@/api';

export default () => {
  const loading = ref(false);

  const clearTrash = async () => {
    loading.value = true;

    try {
      return await noteApi.clearTrash();
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, clearTrash };
};
