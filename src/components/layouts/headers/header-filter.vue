<script setup>
import { h } from 'vue';
import {
  BaseButton,
  BaseDropdown,
  BaseCollapse,
  BaseSelect,
} from '@/components/base';
import { Icon } from '@vicons/utils';
import { Filter as FilterIcon } from '@vicons/carbon';

const renderItemCollapse = (label, options) => () =>
  h(
    BaseCollapse,
    {
      label,
      class: 'block py-2',
      labelClass: 'block px-4',
      contentClass: 'block px-4 mt-2',
    },
    { default: () => h(BaseSelect, { options, size: 'sm' }) }
  );

const items = [
  {
    key: 'sort',
    label: 'Sort',
    render: renderItemCollapse('Sort', [
      {
        key: 'all',
        value: '',
        label: 'All',
      },
      {
        key: 'createdAt',
        value: 'createdAt',
        label: 'Created',
      },
      {
        key: 'name',
        value: 'name',
        label: 'Name',
      },
    ]),
  },
  {
    key: 'order',
    label: 'Order',
    render: renderItemCollapse('Order', [
      {
        key: 'all',
        value: '',
        label: 'All',
      },
      {
        key: 'asc',
        value: 'asc',
        label: 'ASC',
      },
      {
        key: 'desc',
        value: 'desc',
        label: 'DESC',
      },
    ]),
  },
];
</script>
<template>
  <base-dropdown :items="items" position="right">
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
  </base-dropdown>
</template>
