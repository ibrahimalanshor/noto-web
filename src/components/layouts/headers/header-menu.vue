<script setup>
import { ref, reactive, watch } from 'vue';
import { LayoutApp } from '@/layouts';
import { BaseInput, BaseButton, BaseDropdown } from '@/components/base';
import HeaderFilter from './header-filter.vue';
import { Icon } from '@vicons/utils';
import { Menu as MenuIcon, Add as NewIcon } from '@vicons/carbon';
import { useSidebar } from '@/store';

const props = defineProps({
  filter: Object,
  searchPlaceholder: {
    type: String,
    default: 'Search Something',
  },
  createLabel: {
    type: String,
    default: 'New',
  },
  creatable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['create', 'search', 'filter']);

const sidebar = useSidebar();

const filter = reactive({
  name: props.filter?.name,
  sort: props.filter?.sort,
  order: props.filter?.order,
});

const handleClickMenu = () => {
  sidebar.show();
};
const handleCreate = () => {
  emit('create');
};
const handleInputSearch = () => {
  emit('search', filter.name);
};
const handleChangeFilter = ({ sort, order }) => {
  filter.sort = sort;
  filter.order = order;

  emit('filter', filter);
};

watch(
  props.filter,
  () => {
    filter.name = props.filter?.name;
    filter.sort = props.filter?.sort;
    filter.order = props.filter?.order;
  },
  { deep: true }
);
</script>

<template>
  <div class="flex space-x-4 mb-4 md:space-x-0">
    <button class="md:hidden" id="sidebar-toggle" v-on:click="handleClickMenu">
      <icon size="20">
        <menu-icon />
      </icon>
    </button>
    <div class="flex flex-grow space-x-4">
      <div class="flex-grow">
        <base-input
          :placeholder="props.searchPlaceholder"
          v-model="filter.name"
          v-on:input="handleInputSearch"
        />
      </div>
      <header-filter
        :filter="filter"
        v-on:change="handleChangeFilter"
        v-if="props.filterable"
      />
      <div v-if="props.creatable">
        <base-button
          class="hidden md:block"
          :label="props.createLabel"
          v-on:click="handleCreate"
          block
        />
        <base-button
          class="md:hidden flex items-center"
          v-on:click="handleCreate"
          block
        >
          <icon size="20">
            <new-icon />
          </icon>
        </base-button>
      </div>
    </div>
  </div>
</template>
