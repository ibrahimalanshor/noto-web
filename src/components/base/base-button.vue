<script setup>
import { computed } from 'vue';
import BaseSpin from './base-spin.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'md',
  },
  label: String,
  outline: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  badge: null,
});

const buttonClass = computed(() => {
  const colors = {
    default: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
      props.outline
        ? 'border border-blue-700 text-blue-700 hover:text-white'
        : ''
    }`,
    alternative: `font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`,
    dark: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
      props.outline
        ? 'border border-gray-700 text-gray-700 hover:text-white'
        : ''
    }`,
    light: `text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`,
    success: `focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
      props.outline
        ? 'border border-green-700 text-green-700 hover:text-white'
        : ''
    }`,
    danger: `focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
      props.outline ? 'border border-red-700 text-red-700 hover:text-white' : ''
    }`,
    warning: `focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900 ${
      props.outline
        ? 'border border-yellow-700 text-yellow-700 hover:text-white'
        : ''
    }`,
    info: `focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ${
      props.outline
        ? 'border border-purple-700 text-purple-700 hover:text-white'
        : ''
    }`,
  };

  const sizes = {
    xs: 'py-2 px-3 text-xs',
    sm: 'py-2 px-3 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'py-3 px-5 text-base',
    xl: 'px-6 py-3.5 text-base',
  };

  const blockClass = props.block ? 'w-full' : '';
  const colorClass = colors[props.color] ?? colors.default;
  const sizeClass = sizes[props.size] ?? sizes.md;
  const outlineClass = props.outline ? 'bg-transparent' : '';
  const disabledClass = 'disabled:opacity-50';

  return [blockClass, colorClass, sizeClass, outlineClass, disabledClass];
});

const badgeClass = computed(() => {
  const colors = {
    default:
      'inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full',
    danger:
      'inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-red-800 bg-red-200 rounded-full',
    success:
      'inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-green-800 bg-green-200 rounded-full',
    warning:
      'inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full',
    info: 'inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-purple-800 bg-purple-200 rounded-full',
  };

  const colorClass = colors[props.color] ?? colors.default;
  return [colorClass];
});
</script>

<template>
  <button type="button" :class="buttonClass">
    <base-spin class="mr-2" v-if="props.loading" />
    <slot>
      {{ props.label }}
    </slot>
    <span :class="badgeClass" v-if="props.badge">
      {{ props.badge }}
    </span>
  </button>
</template>
