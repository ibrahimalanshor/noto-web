<script setup>
import BaseInput from './base-input.vue';

const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Placeholder',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="mb-6">
    <label
      :for="props.id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ props.label }}</label
    >
    <slot>
      <base-input
        :id="props.id"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
    </slot>
  </div>
</template>
