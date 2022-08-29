<script setup>
import { ref, watch, computed, h } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { Icon } from '@vicons/utils';
import {
  Close as CloseIcon,
  ChevronDown as ChevronDownIcon,
} from '@vicons/carbon';

const props = defineProps({
  modelValue: null,
  options: Array,
  color: {
    type: String,
    default: 'default',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'name',
  },
});
const emit = defineEmits(['update:modelValue', 'open', 'search', 'change']);

const value = ref(props.modelValue);

const inputClass = computed(() => {
  const colors = {
    default: ``,
    danger: `danger`,
  };
  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});

const handleOpen = () => emit('open');
const handleSearch = (val) => emit('search', val);
const handleSelected = (val) => {
  emit('update:modelValue', val);
  emit('change', val);
};
const handleDeselected = () => {
  emit('update:modelValue', null);
  emit('change', null);
};

const Deselect = h(
  Icon,
  { size: 16, onClick: handleDeselected },
  { default: () => h(CloseIcon) }
);
const OpenIndicator = h(
  Icon,
  { size: 16 },
  { default: () => h(ChevronDownIcon) }
);

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>

<template>
  <v-select
    class="custom-v-select"
    :components="{ Deselect, OpenIndicator }"
    :options="props.options"
    :label="props.label"
    placeholder="Select"
    :class="inputClass"
    :loading="props.loading"
    :filterable="props.filterable"
    v-model="value"
    v-on:open="handleOpen"
    v-on:search="handleSearch"
    v-on:option:selected="handleSelected"
  />
</template>

<style>
.custom-v-select .vs__dropdown-toggle {
  @apply py-2 px-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed;
}
.custom-v-select.vs--open {
  @apply ring-1 rounded-lg ring-blue-500 border-blue-500;
}
.custom-v-select.danger .vs__dropdown-toggle {
  @apply bg-red-50 border-red-500 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500;
}
.custom-v-select.danger.vs--open {
  @apply ring-1 rounded-lg ring-red-500 border-red-500;
}
.custom-v-select .vs__search::placeholder {
  @apply text-sm text-gray-500;
}
.custom-v-select.danger .vs__search::placeholder {
  @apply text-sm text-red-700;
}
.custom-v-select .vs__selected-options,
.custom-v-select .vs__selected,
.custom-v-select .vs__search,
.custom-v-select .vs__search:focus,
.custom-v-select .vs__actions,
.custom-v-select .vs__dropdown-menu,
.custom-v-select .vs__search::placeholder {
  @apply p-0 m-0;
}
.custom-v-select .vs__dropdown-menu {
  @apply bg-gray-50 rounded-b-lg shadow-none top-11 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600;
}
.custom-v-select .vs__selected {
  @apply dark:text-gray-100;
}
.custom-v-select .vs__dropdown-option {
  @apply px-3 py-2;
}
.custom-v-select .vs__dropdown-option--highlight {
  @apply bg-blue-700;
}
.custom-v-select .vs__dropdown-option--highlight {
  @apply bg-blue-700;
}
.custom-v-select .vs__no-options {
  @apply px-3 py-2;
}
.custom-v-select .vs__clear {
  @apply flex items-center mr-1;
}
.custom-v-select.vs--loading .vs__open-indicator {
  @apply hidden;
}
.custom-v-select .vs__spinner {
  @apply ml-1 w-4 h-4 border-2 border-gray-200 border-l-blue-700;
}
</style>
