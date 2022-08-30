<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const progressWidth = ref(0);
const progressVisible = ref(true);

let progressInterval;

const startProgress = () => {
  progressWidth.value = 0;
  progressVisible.value = true;

  progressInterval = setInterval(() => {
    progressWidth.value += 1;

    if (progressWidth.value >= 100) {
      progressVisible.value = false;

      clearInterval(progressInterval);
    }
  }, 100);
};

router.beforeEach(() => {
  progressWidth.value = 0;

  startProgress();
});

router.afterEach(() => {
  progressWidth.value = 100;
  clearInterval(progressInterval);

  setTimeout(() => {
    progressVisible.value = false;
  }, 150);
});
</script>

<template>
  <div
    class="fixed top-0 left-0 h-[3px] bg-amber-400 z-[999] transition-all"
    :style="{ width: `${progressWidth}%` }"
    v-if="progressVisible"
  />
</template>
