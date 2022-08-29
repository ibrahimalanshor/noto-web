import { ref } from 'vue';
import { note as noteApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const loading = ref(false);

  const updateNoteFavorite = async (id, isFavorite) => {
    loading.value = true;

    try {
      return await noteApi.updateFavorite(id, isFavorite);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, updateNoteFavorite };
};
