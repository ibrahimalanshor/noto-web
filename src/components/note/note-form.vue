<script setup>
import { reactive, watch, onMounted } from 'vue';
import { BaseForm, BaseTextarea } from '@/components/base';

const props = defineProps({
  modelValue: Object,
  validation: Object,
});
const emit = defineEmits(['update:modelValue', 'submit']);

const form = reactive({
  name: null,
  content: null,
});

const setForm = () => {
  form.name = props.modelValue?.name ?? null;
  form.content = props.modelValue?.content ?? null;
};

const handleChange = () => {
  emit('update:modelValue', form);
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
  <div>
    <base-form
      type="text"
      placeholder="Title"
      label="Title"
      :color="validation?.name ? 'danger' : ''"
      :helper="validation?.name?.msg"
      v-model="form.name"
      v-on:change="handleChange"
    />
    <base-form type="text" placeholder="Tags" label="Tags" />
    <base-form
      label="Content"
      :color="validation?.content ? 'danger' : ''"
      :helper="validation?.content?.msg"
    >
      <base-textarea
        placeholder="Content"
        :color="validation?.content ? 'danger' : ''"
        v-model="form.content"
        v-on:change="handleChange"
      />
    </base-form>
  </div>
</template>
