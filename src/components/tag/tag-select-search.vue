<script setup>
import { ref, watch, onMounted } from 'vue';
import { BaseSelectSearch } from '@/components/base';
import { debounce } from '@/utils';

import { useI18n } from 'vue-i18n';
import { useGetTag } from '@/compose/tag';

const props = defineProps({
  modelValue: null,
  placeholder: String,
  color: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['update:modelValue', 'change', 'error']);

const { t } = useI18n();
const { tag, loading, filter, getTag } = useGetTag();

const value = ref(props.modelValue);

const setTag = async () => {
  try {
    filter.sort = 'name';

    await getTag();
  } catch (err) {
    emit('error', new Error(t('error.client')));
  }
};
const setTagDebounce = debounce(setTag);

const handleOpen = () => setTag();
const handleSearch = (val) => {
  filter.name = val;

  setTagDebounce();
};
const handleChange = () => {
  emit('update:modelValue', value.value);
  emit('change', value.value);
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);

onMounted(() => {
  setTag();
});
</script>

<template>
  <base-select-search
    :color="props.color"
    :options="tag.rows"
    :placeholder="props.placeholder"
    v-on:open="handleOpen"
    v-on:search="handleSearch"
    v-on:change="handleChange"
    v-model="value"
    :loading="loading"
  />
</template>
