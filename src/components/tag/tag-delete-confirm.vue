<script setup>
import { ref, watch } from 'vue';
import { BaseConfirm } from '@/components/base';

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

    toast.show('Something Error');
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
    text="Are you sure you want to delete this tag?"
    :confirm-loading="loading"
    :confirm-disabled="loading"
    v-model="visible"
    v-on:close="handleClose"
    v-on:confirm="handleConfirm"
  />
</template>
