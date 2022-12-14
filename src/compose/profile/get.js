import { ref } from 'vue';
import { profile as profileApi } from '@/api';

export default () => {
  const profile = ref({
    name: null,
    email: null,
  });
  const loading = ref(true);

  const getProfile = async () => {
    loading.value = true;

    try {
      const res = await profileApi.get();

      profile.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { profile, loading, getProfile };
};
