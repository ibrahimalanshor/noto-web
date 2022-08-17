<script setup>
import { LayoutApp } from '@/layouts';
import { BaseInput, BaseButton, BaseDropdown } from '@/components/base';
import HeaderFilter from './header-filter.vue';
import { Icon } from '@vicons/utils';
import { Menu as MenuIcon, Add as NewIcon } from '@vicons/carbon';
import { useSidebar } from '@/store';

const props = defineProps({
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
const emit = defineEmits(['create']);

const sidebar = useSidebar();

const handleClickMenu = () => {
  sidebar.show();
};
const handleCreate = () => {
  emit('create');
};
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
        <base-input :placeholder="props.searchPlaceholder" />
      </div>
      <header-filter v-if="props.filterable" />
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
