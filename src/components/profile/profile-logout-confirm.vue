<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);

const visible = ref(props.modelValue);

const handleClose = () => {
  emit('update:modelValue', false);
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
  <base-confirm
    text="Logout from your account?"
    v-model="visible"
    v-on:close="handleClose"
  />
</template>
