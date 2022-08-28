<script setup>
import { ref, watch, computed } from 'vue';
import BaseInput from './base-input.vue';

const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
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
  color: {
    type: String,
    default: 'default',
  },
  helper: String,
});

const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const labelClass = computed(() => {
  const colors = {
    default: 'text-gray-900 dark:text-gray-300',
    danger: 'text-red-700 dark:text-red-500',
  };

  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});

const helperClass = computed(() => {
  const colors = {
    default: 'text-gray-500 dark:text-gray-400',
    danger: 'text-red-600 dark:text-red-500',
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
  <div class="mb-6">
    <label
      :for="props.id"
      class="block mb-2 text-sm font-medium"
      :class="labelClass"
      >{{ props.label }}</label
    >
    <slot>
      <base-input
        :id="props.id"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :color="props.color"
        v-model="value"
        v-on:change="handleChange"
      />
    </slot>
    <p class="mt-2 text-sm" :class="helperClass" v-if="props.helper">
      {{ props.helper }}
    </p>
  </div>
</template>
