<script setup>
import { computed, ref, watch } from 'vue';
import { Icon } from '@vicons/utils';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Checkmark as SuccessIcon,
} from '@vicons/carbon';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: String,
  type: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['update:modelValue']);

const visible = ref(props.modelValue);

const iconClass = computed(() => {
  const colors = {
    default: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
    danger: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
    success:
      'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
    warning:
      'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200',
  };

  const colorClass = colors[props.type] ?? colors.default;

  return [colorClass];
});

const iconComponent = computed(() => {
  const icons = {
    default: WarningIcon,
    danger: ErrorIcon,
    success: SuccessIcon,
    warning: WarningIcon,
  };

  return icons[props.type] ?? icon.default;
});

const hide = () => {
  visible.value = false;

  emit('update:modelValue', visible.value);
};

const handleClose = () => hide();

watch(visible, () => {
  setTimeout(() => {
    hide();
  }, 3000);
});

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <div class="fixed top-8 left-0 w-full px-4 md:px-0" v-if="visible">
    <div
      class="flex mx-auto items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg"
        :class="iconClass"
      >
        <icon size="16">
          <component :is="iconComponent"></component>
        </icon>
      </div>
      <div class="ml-3 text-sm font-normal">
        <slot>
          {{ props.text }}
        </slot>
      </div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        v-on:click="handleClose"
      >
        <icon size="24">
          <close-icon />
        </icon>
      </button>
    </div>
  </div>
</template>
