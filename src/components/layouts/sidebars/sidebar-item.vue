<script setup>
import { Icon } from '@vicons/utils';
import { useRouter } from 'vue-router';

const props = defineProps({
  icon: null,
  label: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  to: null,
});
const emit = defineEmits(['click']);

const router = useRouter();

const handleClickItem = () => {
  if (props.to) {
    router.push(props.to);
  }

  emit('click');
};
</script>

<template>
  <li>
    <button
      class="flex w-full items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-700"
      :class="[props.active ? 'bg-white text-gray-900' : 'text-white']"
      v-on:click="handleClickItem"
    >
      <icon size="16">
        <component :is="props.icon" />
      </icon>
      <span class="ml-3">{{ props.label }}</span>
    </button>
  </li>
</template>
