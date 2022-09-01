<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

import { useI18n } from 'vue-i18n';
import { useToast } from '@/store';
import { useDeleteNote } from '@/compose/note';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  note: {
    type: null,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'success', 'close']);

const { t } = useI18n();
const toast = useToast();
const { loading, deleteNote } = useDeleteNote();

const visible = ref(props.modelValue);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleConfirm = async () => {
  try {
    const res = await deleteNote(props.note);

    toast.show(res.message, 'success');

    emit('success');
  } catch (err) {
    toast.show(t('error.client'));
  } finally {
    close();
  }
};
const handleClose = () => {
  close();
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
    :text="t('action.ask-confirm', { name: 'note' })"
    v-model="visible"
    :confirm-disabled="loading"
    :confirm-loading="loading"
    v-on:confirm="handleConfirm"
    v-on:close="handleClose"
  />
</template>
