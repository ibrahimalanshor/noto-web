<script setup>
import { ref, watch, computed } from 'vue';
import { Icon } from '@vicons/utils';
import {
  Notebook as AllNoteIcon,
  Catalog as TagIcon,
  Bookmark as FavoriteIcon,
  TrashCan as TrashIcon,
  ChevronLeft as CollapseIcon,
} from '@vicons/carbon';
import { SidebarItem } from './sidebars';
import { useSidebar } from '@/store';
import { useRoute } from 'vue-router';

const items = [
  {
    key: 'Home',
    icon: AllNoteIcon,
    label: 'All Notes',
    to: {
      name: 'Home',
    },
  },
  {
    key: 'Favorite',
    icon: FavoriteIcon,
    label: 'Favorite',
    to: {
      name: 'Favorite',
    },
  },
  {
    key: 'Tag',
    icon: TagIcon,
    label: 'Tags',
    to: {
      name: 'Tag',
    },
  },
  {
    key: 'Trash',
    icon: TrashIcon,
    label: 'Trash',
    to: {
      name: 'Trash',
    },
  },
];

const route = useRoute();
const sidebar = useSidebar();

const activeKey = computed(() => route.name);

const handleClickCollapse = () => {
  sidebar.hide();
};
const handleClickOutside = (e) => {
  const sidebarToggle = document.getElementById('sidebar-toggle');

  if (sidebarToggle && !sidebarToggle.contains(e.target)) {
    sidebar.hide();
  }
};

watch(route, () => {
  sidebar.hide();
});
</script>

<template>
  <aside
    class="z-10 fixed top-0 w-64 h-full bg-blue-700 md:left-0 transition-all"
    :class="[sidebar.collapsed ? '-left-full' : 'left-0']"
    aria-label="Sidebar"
    v-click-outside="handleClickOutside"
  >
    <div class="overflow-y-auto py-4 px-3 rounded">
      <ul class="space-y-2">
        <li
          class="flex items-center justify-between p-2 text-base font-normal text-white"
        >
          <span class="font-bold uppercase tracking-tight">Noto</span>
          <button v-on:click="handleClickCollapse" class="md:hidden">
            <icon size="16">
              <collapse-icon />
            </icon>
          </button>
        </li>
        <sidebar-item
          :icon="item.icon"
          :label="item.label"
          :to="item.to"
          :active="activeKey === item.key"
          v-for="item in items"
          :key="item.label"
        />
      </ul>
    </div>
    <teleport to="body">
      <div
        class="fixed inset-0 bg-transparent md:hidden"
        :class="{ hidden: sidebar.collapsed }"
      ></div>
    </teleport>
  </aside>
</template>
