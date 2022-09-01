<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useDeleteTag } from '@/compose/tag';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: null,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const { loading, deleteTag } = useDeleteTag();

const visible = ref(props.modelValue);

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
const handleConfirm = async () => {
  try {
    const res = await deleteTag(props.tag.id);

    toast.show(res.message, 'success');
    router.push({ name: 'Tag' });
  } catch (err) {
    emit('update:modelValue', false);

    toast.show(t('error.client'));
  }
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
    :text="t('action.ask-confirm', { name: 'tag' })"
    :confirm-loading="loading"
    :confirm-disabled="loading"
    v-model="visible"
    v-on:close="handleClose"
    v-on:confirm="handleConfirm"
  />
</template>
