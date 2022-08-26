import { ref } from 'vue';
import { profile as profileApi } from '@/api';

export default () => {
  const profile = ref();
  const loading = ref(false);

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
