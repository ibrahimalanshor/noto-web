<script setup>
import { ref, watch } from 'vue';
import { BaseModal, BaseForm, BaseButton } from '@/components/base';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'close']);

const visible = ref(props.visible);

const handleClose = () => {
  emit('close');
  emit('update:visible', false);
};

watch(
  () => props.visible,
  () => {
    visible.value = props.visible;
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
    <base-form label="Name" placeholder="Name" class="mb-2" />

    <template #footer="{ close }">
      <base-button color="light" v-on:click="close">Cancel</base-button>
      <base-button>Save</base-button>
    </template>
  </base-modal>
</template>
