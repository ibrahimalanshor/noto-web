<script setup>
import { reactive, watch, onMounted } from 'vue';
import { BaseForm, BaseButton } from '@/components/base';
import { capitalize } from '@/utils';

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue', 'submit']);

const colors = ['primary', 'dark', 'warning', 'danger', 'success', 'info'];
const form = reactive({
  name: null,
  color: null,
});

const setForm = () => {
  form.name = props.modelValue?.name ?? null;
  form.color = props.modelValue?.color ?? null;
};

const handleClickColor = (color) => (form.color = color);
const handleSubmit = () => {
  emit('update:modelValue', form.value);
  emit('submit');
};

onMounted(() => setForm());

watch(
  () => props.modelValue,
  () => {
    setForm();
  }
);
</script>

<template>
  <form v-on:submit.prevent="handleSubmit">
    <base-form label="Name" placeholder="Name" />
    <base-form label="Color" class="mb-2">
      <div class="space-x-2">
        <base-button
          v-for="color in colors"
          :key="color"
          size="sm"
          :color="color"
          :outline="form.color !== color"
          v-on:click="handleClickColor(color)"
          >{{ capitalize(color) }}</base-button
        >
      </div>
    </base-form>
  </form>
</template>
