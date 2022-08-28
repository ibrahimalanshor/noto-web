import { ref } from 'vue';
import { tag as tagApi } from '@/api';

export default () => {
  const loading = ref(false);

  const deleteTag = async (id) => {
    loading.value = true;

    try {
      return await tagApi.delete(id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    deleteTag,
  };
};
