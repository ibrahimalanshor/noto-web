<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@vicons/utils';
import { Close as CloseIcon } from '@vicons/carbon';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Title',
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'show', 'close', 'toggle']);

const visible = ref(props.modelValue);

const show = () => {
  visible.value = true;

  emit('show');
  emit('update:modelValue', visible.value);
};
const close = () => {
  visible.value = false;

  emit('close');
  emit('update:modelValue', visible.value);
};
const toggle = () => {
  visible.value = !visible.value;

  emit('toggle');
  emit('update:modelValue', visible.value);
};

const handleToggle = () => toggle();
const handleClose = () => close();

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <teleport to="body" v-if="visible">
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full justify-center items-center flex bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div
          class="relative bg-white rounded-lg shadow dark:bg-gray-700"
          v-click-outside="handleClose"
        >
          <div
            class="flex justify-between items-center p-4 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              <slot name="title">{{ props.title }}</slot>
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              v-on:click="handleClose"
            >
              <icon size="24">
                <close-icon />
              </icon>
            </button>
          </div>
          <div class="p-6 space-y-6">
            <slot />
          </div>
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
            v-if="props.showFooter"
          >
            <slot name="footer" :close="handleClose" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
