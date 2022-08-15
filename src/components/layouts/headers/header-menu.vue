<script setup>
import { LayoutApp } from '@/layouts';
import { BaseInput, BaseButton } from '@/components/base';
import { Icon } from '@vicons/utils';
import { Menu as MenuIcon } from '@vicons/carbon';
import { useSidebar } from '@/store';

const props = defineProps({
  searchPlaceholder: {
    type: String,
    default: 'Search Something',
  },
});

const sidebar = useSidebar();

const handleClickMenu = () => {
  sidebar.show();
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
      <div>
        <slot name="create-action">
          <router-link :to="{ name: 'NoteCreate' }" v-slot="{ navigate }">
            <base-button label="New Note" v-on:click="navigate" block />
          </router-link>
        </slot>
      </div>
    </div>
  </div>
</template>
