<script setup>
import { Icon } from '@vicons/utils';

const props = defineProps({
  icon: null,
  label: {
    type: String,
  },
});
</script>

<template>
  <li>
    <a
      href="#"
      class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-700"
    >
      <icon size="16">
        <component :is="props.icon" />
      </icon>
      <span class="ml-3">{{ props.label }}</span>
    </a>
  </li>
</template>
