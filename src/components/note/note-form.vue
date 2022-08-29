<script setup>
import { reactive, watch, onMounted } from 'vue';
import { BaseForm, BaseTextarea, BaseAlert } from '@/components/base';
import { TagSelectSearch } from '@/components/tag';

const props = defineProps({
  modelValue: Object,
  validation: Object,
});
const emit = defineEmits(['update:modelValue', 'submit']);

const form = reactive({
  name: null,
  content: null,
  tagId: null,
});
const alert = reactive({
  visible: false,
  text: '',
});

const setForm = () => {
  form.name = props.modelValue?.name ?? null;
  form.content = props.modelValue?.content ?? null;
};

const handleChange = () => {
  emit('update:modelValue', form);
};
const handleErrorTag = (err) => {
  alert.text = err.message;
  alert.visible = true;
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
    <base-alert
      class="mb-4"
      color="danger"
      :text="alert.text"
      v-model="alert.visible"
    />
    <base-form
      type="text"
      placeholder="Name"
      label="Name"
      :color="validation?.name ? 'danger' : ''"
      :helper="validation?.name?.msg"
      v-model="form.name"
      v-on:change="handleChange"
    />
    <base-form
      label="Tags"
      :color="validation?.tagId ? 'danger' : ''"
      :helper="validation?.tagId?.msg"
    >
      <tag-select-search
        :color="validation?.tagId ? 'danger' : ''"
        v-model="form.tagId"
        v-on:error="handleErrorTag"
      />
    </base-form>
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
