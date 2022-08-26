<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@vicons/utils';
import { Warning as WarningIcon, Close as CloseIcon } from '@vicons/carbon';
import BaseButton from './base-button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: 'Are you sure you want to delete this product?',
  },
  confirmText: {
    type: String,
    default: "Yes, I'm sure",
  },
  cancelText: {
    type: String,
    default: 'No, cancel',
  },
  confirmDisabled: {
    type: Boolean,
    default: false,
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close', 'confirm']);

const visible = ref(props.modelValue);

const handleConfirm = () => {
  emit('confirm');
};
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
  <teleport to="body" v-if="visible">
    <div
      id="popup-modal"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-full justify-center items-center flex bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="relative p-4 w-full max-w-md h-full md:h-auto"
        v-click-outside="handleClose"
      >
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            v-on:click="handleClose"
          >
            <icon size="24">
              <close-icon />
            </icon>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <icon size="52" class="text-gray-400 mb-3">
              <slot name="icon">
                <warning-icon />
              </slot>
            </icon>
            <slot>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                {{ props.text }}
              </h3>
            </slot>
            <div class="space-x-2">
              <slot name="confirm">
                <base-button
                  color="danger"
                  :label="props.confirmText"
                  v-on:click="handleConfirm"
                  :disabled="props.confirmDisabled"
                  :loading="props.confirmLoading"
                />
              </slot>
              <slot name="cancel">
                <base-button
                  color="light"
                  :label="props.cancelText"
                  v-on:click="handleClose"
                />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
