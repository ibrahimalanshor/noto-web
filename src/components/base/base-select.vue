<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: null,
  options: Array,
  size: {
    type: String,
    default: 'md',
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const selectClass = computed(() => {
  const sizes = {
    sm: 'block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    md: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    lg: 'block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  };

  return [sizes[props.size] ?? sizes.md];
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
  <select :class="selectClass" v-model="value" v-on:change="handleChange">
    <option v-for="option in options" :key="option.key" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
