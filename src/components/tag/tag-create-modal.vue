<script setup>
import { ref, reactive, watch } from 'vue';
import { BaseModal, BaseButton, BaseAlert } from '@/components/base';
import TagForm from './tag-form.vue';

import { HandledError } from '@/interfaces';

import { useI18n } from 'vue-i18n';
import { useToast } from '@/store';
import { useCreateTag } from '@/compose/tag';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close', 'created']);

const { t } = useI18n();
const toast = useToast();
const { body, validation, loading, resetBody, resetValidation, createTag } =
  useCreateTag();

const alert = reactive({
  visible: false,
  text: '',
});
const visible = ref(props.modelValue);

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
const handleSave = async () => {
  alert.visible = false;

  try {
    const res = await createTag();

    emit('created');
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
    resetBody();
    resetValidation();
  }
});
</script>

<template>
  <base-modal
    :title="t('tag.create.title')"
    :show-footer="true"
    v-model="visible"
    v-on:close="handleClose"
  >
    <base-alert color="danger" :text="alert.text" v-model="alert.visible" />
    <tag-form :validation="validation" v-model="body" />

    <template #footer="{ close }">
      <base-button color="light" v-on:click="close">{{
        t('action.cancel')
      }}</base-button>
      <base-button
        v-on:click="handleSave"
        :disabled="loading"
        :loading="loading"
        >{{ t('action.save') }}</base-button
      >
    </template>
  </base-modal>
</template>
