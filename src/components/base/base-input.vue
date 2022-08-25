<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  color: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const inputClass = computed(() => {
  const colors = {
    default: `block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`,
    danger: ` block w-full p-2.5 text-sm bg-red-50 border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 disabled:cursor-not-allowed`,
  };
  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});

const handleChange = () => {
  emit('update:modelValue', value.value);
  emit('change', value.value);
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>

<template>
  <input
    type="text"
    :class="inputClass"
    placeholder="Placeholder"
    v-model="value"
    v-on:input="handleChange"
  />
</template>
