import { ref, reactive } from 'vue';
import { note as noteApi } from '@/api';

export default () => {
  const note = ref({});
  const loading = ref(true);
  const filter = reactive({
    name: null,
    sort: null,
    order: null,
  });

  const getNote = async () => {
    loading.value = true;

    try {
      const res = await noteApi.get(filter);

      note.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { note, loading, filter, getNote };
};
