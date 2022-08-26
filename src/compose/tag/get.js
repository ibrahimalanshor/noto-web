import { ref } from 'vue';
import { tag as tagApi } from '@/api';
import { HandledError } from '@/interfaces';

export default () => {
  const loading = ref(true);
  const tag = ref({
    count: 0,
    rows: [],
  });

  const getTag = async () => {
    loading.value = true;

    try {
      const res = await tagApi.get();

      tag.value = res.data;
    } catch (err) {
      if (err.response) {
        if (['403'].includes(err.response.data.status)) {
          throw new HandledError(err.response.data);
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, tag, getTag };
};
