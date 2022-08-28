<script setup>
import { ref, computed, watch } from 'vue';
import { Icon } from '@vicons/utils';
import { Close as CloseIcon } from '@vicons/carbon';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: String,
  color: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['update:modelValue', 'close']);

const visible = ref(props.modelValue);

const alertClass = computed(() => {
  const colors = {
    default: 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300',
    primary: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
    danger: 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800',
    success:
      'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
    warning:
      'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800',
  };

  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});

const closeClass = computed(() => {
  const colors = {
    default:
      'bg-gray-100 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
    primary:
      'bg-blue-100 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300',
    danger:
      'bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300',
    success:
      'bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300',
    warning:
      'bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300',
  };

  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});

const handleClose = () => {
  visible.value = false;

  emit('update:modelValue', visible.value);
  emit('close');
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <div
    class="p-4 text-sm flex items-center justify-between rounded-lg"
    :class="alertClass"
    role="alert"
    v-if="visible"
  >
    <slot>
      {{ props.text }}
    </slot>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8"
      :class="closeClass"
      aria-label="Close"
      v-on:click="handleClose"
    >
      <icon size="24">
        <close-icon />
      </icon>
    </button>
  </div>
</template>
