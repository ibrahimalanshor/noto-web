<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'default',
  },
});

const dotClass = computed(() => {
  const colors = {
    default: 'bg-gray-300',
    primary: 'bg-blue-700',
    danger: 'bg-red-700',
    success: 'bg-green-700',
    warning: 'bg-yellow-700',
    info: 'bg-purple-700',
  };

  return [colors[props.color] ?? colors.default];
});
</script>

<template>
  <div class="w-3 h-3 rounded-full" :class="dotClass" />
</template>
