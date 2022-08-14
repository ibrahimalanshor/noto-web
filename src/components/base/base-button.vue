<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: String,
  label: String,
  block: {
    type: Boolean,
    default: false,
  },
});

const buttonClass = computed(() => {
  const blockClass = props.block ? 'w-full' : '';

  return [blockClass];
});
</script>

<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    :class="buttonClass"
  >
    <slot>
      {{ props.label }}
    </slot>
  </button>
</template>
