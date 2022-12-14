<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

import { useI18n } from 'vue-i18n';
import { useToast } from '@/store';
import { useUpdateNoteTrash } from '@/compose/note';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  note: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'success', 'close']);

const { t } = useI18n();
const toast = useToast();
const { loading, updateNoteTrash } = useUpdateNoteTrash();

const visible = ref(props.modelValue);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleConfirm = async () => {
  try {
    await updateNoteTrash(props.note.id, !props.note.isTrash);

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
    :text="
      props.note.isTrash
        ? t('note.confirm.restore')
        : t('note.confirm.move-to-trash')
    "
    v-model="visible"
    :confirm-color="props.note.isTrash ? 'success' : 'danger'"
    :confirm-disabled="loading"
    :confirm-loading="loading"
    v-on:confirm="handleConfirm"
    v-on:close="handleClose"
  />
</template>
