import { ref, reactive } from 'vue';
import { tag as tagApi } from '@/api';

export default () => {
  const loading = ref(true);
  const tag = ref({
    count: 0,
    rows: [],
  });
  const filter = reactive({
    name: null,
    sort: null,
    order: null,
  });

  const resetFilter = () => {
    filter.name = null;
    filter.sort = null;
    filter.order = null;
  };

  const getTag = async () => {
    loading.value = true;

    try {
      const res = await tagApi.get(filter);

      tag.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, tag, filter, resetFilter, getTag };
};
