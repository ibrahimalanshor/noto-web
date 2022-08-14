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
  },
  {
    key: 'Favorite',
    icon: FavoriteIcon,
    label: 'Favorite',
  },
  {
    key: 'Tag',
    icon: TagIcon,
    label: 'Tags',
  },
  {
    key: 'Trash',
    icon: TrashIcon,
    label: 'Trash',
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
    class="fixed top-0 -left-full w-64 h-full bg-blue-600 md:left-0 transition-all"
    :class="{ 'left-0': !sidebar.collapsed }"
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
          :active="activeKey === item.key"
          v-for="item in items"
          :key="item.label"
        />
      </ul>
    </div>
  </aside>
</template>
