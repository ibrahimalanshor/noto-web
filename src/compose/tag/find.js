import { ref } from 'vue';
import { tag as tagApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const tag = ref();
  const loading = ref(true);

  const findTag = async (id) => {
    loading.value = true;

    try {
      const res = await tagApi.find(id);

      tag.value = res.data;
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

  return { tag, loading, findTag };
};
