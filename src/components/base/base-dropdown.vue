<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: Array,
  position: {
    type: String,
    default: 'left',
  },
});

const visible = ref(false);

const menuClass = computed(() => {
  const positions = {
    left: 'left-0',
    right: 'right-0',
  };

  return [
    visible.value ? '' : 'hidden',
    positions[props.position] ?? positions.left,
  ];
});

const toggle = () => (visible.value = !visible.value);
const hide = () => (visible.value = false);

const handleToggle = () => toggle();
const handleClickOutside = () => hide();
</script>

<template>
  <div class="relative" v-click-outside="handleClickOutside">
    <slot name="toggle" :toggle="handleToggle" />
    <slot name="content" :content-class="menuClass">
      <div
        id="dropdown"
        class="absolute top-12 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        :class="menuClass"
      >
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li v-for="item in props.items" :key="item.key">
            <component :is="item.render" v-if="item.render" />
            <div
              class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              v-else
            >
              {{ item.label }}
            </div>
          </li>
        </ul>
      </div>
    </slot>
  </div>
</template>
