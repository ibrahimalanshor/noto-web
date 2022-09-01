<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

import { useI18n } from 'vue-i18n';
import { useClearTrashNote } from '@/compose/note';
import { useToast } from '@/store';

const props = defineProps({
  text: {
    type: String,
    default: 'Are you sure you want to delete this trash?',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close', 'success']);

const { t } = useI18n();
const toast = useToast();
const { loading, clearTrash } = useClearTrashNote();

const visible = ref(props.modelValue);

const handleConfirm = async () => {
  try {
    const res = await clearTrash();

    toast.show(res.message, 'success');

    emit('success');
  } catch (err) {
    toast.show(t('error.client'));
  } finally {
    emit('update:modelValue', false);
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
    :text="props.text"
    v-model="visible"
    :confirm-disabled="loading"
    :confirm-loading="loading"
    v-on:confirm="handleConfirm"
    v-on:close="handleClose"
  />
</template>
