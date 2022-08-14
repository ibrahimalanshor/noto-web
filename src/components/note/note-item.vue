<script setup>
import dayjs from 'dayjs';
import { noteHelper } from '@/helpers';
import { truncate } from '@/utils';
import { BaseDot } from '@/components/base';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="border-b p-5 border-gray-200 hover:bg-gray-100">
    <div class="flex justify-between text-sm text-gray-600 mb-1">
      <div class="flex items-center space-x-2">
        <base-dot :color="props.note.tag?.color" />
        <span>{{ props.note.tag?.name ?? 'No Tag' }}</span>
      </div>
      <time>{{ noteHelper.formatDate(props.note.createdAt) }}</time>
    </div>
    <h2 class="font-bold text-lg text-gray-900 mt-2 mb-1">
      {{ props.note.title }}
    </h2>
    <div class="text-gray-700 leading-loose">
      {{ truncate(props.note.content, { length: 300 }) }}
    </div>
  </div>
</template>
