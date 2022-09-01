<script setup>
import { h, ref, reactive, watch } from 'vue';
import {
  BaseButton,
  BaseDropdown,
  BaseCollapse,
  BaseSelect,
} from '@/components/base';
import { Icon } from '@vicons/utils';
import { Filter as FilterIcon } from '@vicons/carbon';

import { useI18n } from 'vue-i18n';

const props = defineProps({
  filter: Object,
});
const emit = defineEmits(['change', 'reset']);

const { t } = useI18n();

const filter = reactive({
  sort: props.filter?.sort ?? null,
  order: props.filter?.order ?? null,
});

const sortOptions = [
  {
    key: 'all',
    value: null,
    label: t('filter.sort.all'),
  },
  {
    key: 'createdAt',
    value: 'id',
    label: t('filter.sort.created'),
  },
  {
    key: 'name',
    value: 'name',
    label: t('filter.sort.name'),
  },
];

const orderOptions = [
  {
    key: 'all',
    value: null,
    label: t('filter.order.all'),
  },
  {
    key: 'asc',
    value: 'asc',
    label: t('filter.order.asc'),
  },
  {
    key: 'desc',
    value: 'desc',
    label: t('filter.order.desc'),
  },
];

const handleChange = () => {
  emit('change', filter);
};
const handleClickReset = () => {
  filter.sort = null;
  filter.order = null;

  emit('reset', filter);
};

watch(
  props.filter,
  () => {
    filter.sort = props.filter?.sort ?? null;
    filter.order = props.filter?.order ?? null;
  },
  { deep: true }
);
</script>
<template>
  <base-dropdown position="right">
    <template #toggle="{ toggle }">
      <base-button
        color="light"
        class="flex h-full items-center"
        v-on:click="toggle"
      >
        <icon size="16">
          <filter-icon />
        </icon>
      </base-button>
    </template>

    <template #content="{ contentClass }">
      <div
        id="dropdown"
        class="absolute top-12 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        :class="contentClass"
      >
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <base-collapse
              label="Sort"
              class="block py-2"
              label-class="block px-4"
              content-class="block px-4 mt-2"
            >
              <base-select
                v-model="filter.sort"
                :options="sortOptions"
                size="sm"
                v-on:change="handleChange"
              ></base-select>
            </base-collapse>
          </li>
          <li>
            <base-collapse
              label="Order"
              class="block py-2"
              label-class="block px-4"
              content-class="block px-4 mt-2"
            >
              <base-select
                v-model="filter.order"
                :options="orderOptions"
                size="sm"
                v-on:change="handleChange"
              ></base-select>
            </base-collapse>
          </li>
          <li class="block py-2 px-4">
            <base-button
              :label="t('filter.reset')"
              color="danger"
              size="sm"
              block
              v-on:click="handleClickReset"
            />
          </li>
        </ul>
      </div>
    </template>
  </base-dropdown>
</template>
