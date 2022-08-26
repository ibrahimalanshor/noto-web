<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useLogout } from '@/compose/auth';

const router = useRouter();
const toast = useToast();
const { loading, logout } = useLogout();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);

const visible = ref(props.modelValue);

const handleConfirm = async () => {
  try {
    await logout();

    router.push({ name: 'Login' });
  } catch (err) {
    toast.show('Something Error');
  }
};
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
    :confirm-disabled="loading"
    :confirm-loading="loading"
    v-model="visible"
    v-on:close="handleClose"
    v-on:confirm="handleConfirm"
  />
</template>
