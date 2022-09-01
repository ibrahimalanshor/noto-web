<script setup>
import { ref, reactive, watch } from 'vue';
import { BaseModal, BaseButton, BaseAlert } from '@/components/base';
import TagForm from './tag-form.vue';

import { HandledError } from '@/interfaces';

import { useI18n } from 'vue-i18n';
import { useToast } from '@/store';
import { useUpdateTag } from '@/compose/tag';

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
const emit = defineEmits(['update:modelValue', 'close', 'updated']);

const { t } = useI18n();
const toast = useToast();
const { body, validation, loading, setBody, resetValidation, updateTag } =
  useUpdateTag();

const alert = reactive({
  visible: false,
  text: '',
});
const visible = ref(props.modelValue);

const handleClose = () => {
  emit('close');
  emit('update:modelValue', false);
};
const handleSave = async () => {
  alert.visible = false;

  try {
    const res = await updateTag(props.tag.id);

    emit('updated');
    emit('update:modelValue', false);

    toast.show(res.message, 'success');
  } catch (err) {
    if (!(err instanceof HandledError)) {
      alert.visible = true;
      alert.text = t('error.client');
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);

watch(visible, () => {
  if (visible.value) {
    setBody({
      name: props.tag.name,
      color: props.tag.color,
    });

    resetValidation();
  }
});
</script>

<template>
  <base-modal
    :title="t('tag.edit.title')"
    :show-footer="true"
    v-model="visible"
    v-on:close="handleClose"
  >
    <base-alert color="danger" :text="alert.text" v-model="alert.visible" />
    <tag-form :validation="validation" v-model="body" />

    <template #footer="{ close }">
      <base-button color="light" v-on:click="close">Cancel</base-button>
      <base-button
        v-on:click="handleSave"
        :disabled="loading"
        :loading="loading"
        >{{ t('action.save') }}</base-button
      >
    </template>
  </base-modal>
</template>
