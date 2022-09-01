<script setup>
import { reactive, watch, onMounted } from 'vue';
import { BaseForm, BaseTextarea, BaseAlert } from '@/components/base';
import { TagSelectSearch } from '@/components/tag';

import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: Object,
  validation: Object,
});
const emit = defineEmits(['update:modelValue', 'submit']);

const { t } = useI18n();

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
  form.tagId = props.modelValue?.tagId ?? null;
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
  },
  { deep: true }
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
      :placeholder="t('form.placeholder.name')"
      :label="t('form.label.name')"
      :color="validation?.name ? 'danger' : ''"
      :helper="validation?.name?.msg"
      v-model="form.name"
      v-on:change="handleChange"
    />
    <base-form
      :label="t('note.form.label.tag')"
      :color="validation?.tagId ? 'danger' : ''"
      :helper="validation?.tagId?.msg"
    >
      <tag-select-search
        :placeholder="t('note.form.placeholder.tag')"
        :color="validation?.tagId ? 'danger' : ''"
        v-model="form.tagId"
        v-on:change="handleChange"
        v-on:error="handleErrorTag"
      />
    </base-form>
    <base-form
      :label="t('note.form.label.content')"
      :color="validation?.content ? 'danger' : ''"
      :helper="validation?.content?.msg"
    >
      <base-textarea
        :label="t('note.form.placeholder.content')"
        :color="validation?.content ? 'danger' : ''"
        v-model="form.content"
        v-on:change="handleChange"
      />
    </base-form>
  </div>
</template>
