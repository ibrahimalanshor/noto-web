<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@vicons/utils';
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from '@vicons/carbon';

const props = defineProps({
  label: String,
  labelClass: String,
  contentClass: String,
});

const visible = ref(false);

const chevronIcon = computed(() =>
  visible.value ? ChevronUpIcon : ChevronDownIcon
);
const contentClass = computed(() => {
  return [visible.value ? '' : 'hidden', props.contentClass];
});

const toggle = () => (visible.value = !visible.value);

const handleToggle = () => toggle();
</script>
<template>
  <div>
    <div
      class="flex items-center justify-between cursor-pointer"
      :class="props.labelClass"
      v-on:click="handleToggle"
    >
      <span>{{ props.label }}</span>
      <icon class="flex items-center">
        <component :is="chevronIcon" />
      </icon>
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>
