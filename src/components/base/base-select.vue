<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: Array,
  size: {
    type: String,
    default: 'md',
  },
});

const selectClass = computed(() => {
  const sizes = {
    sm: 'block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    md: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    lg: 'block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  };

  return [sizes[props.size] ?? sizes.md];
});
</script>

<template>
  <select :class="selectClass">
    <option v-for="option in options" :key="option.key" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
