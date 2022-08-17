<script setup>
import { ref, watch } from 'vue';
import { BaseModal, BaseButton } from '@/components/base';
import TagForm from './tag-form.vue';

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
  <base-modal
    title="New Tag"
    :show-footer="true"
    v-model="visible"
    v-on:close="handleClose"
  >
    <tag-form />

    <template #footer="{ close }">
      <base-button color="light" v-on:click="close">Cancel</base-button>
      <base-button>Save</base-button>
    </template>
  </base-modal>
</template>
