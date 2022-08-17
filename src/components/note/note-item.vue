<script setup>
import dayjs from 'dayjs';
import { Icon } from '@vicons/utils';
import { StarFilled as FavoriteIcon } from '@vicons/carbon';
import { noteHelper } from '@/helpers';
import { truncate } from '@/utils';
import { BaseDot } from '@/components/base';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
  backRoute: String,
});
</script>

<template>
  <router-link
    :to="{
      name: 'NoteDetail',
      params: { id: props.note.id },
      query: { back: props.backRoute },
    }"
    class="block border-b p-5 border-gray-200 hover:bg-gray-100 cursor-pointer"
  >
    <div class="flex justify-between text-sm text-gray-600 mb-1">
      <div class="flex items-center space-x-2">
        <base-dot :color="props.note.tag?.color" />
        <span>{{ props.note.tag?.name ?? 'No Tag' }}</span>
      </div>
      <time>{{ noteHelper.formatDate(props.note.createdAt) }}</time>
    </div>
    <div class="flex items-center space-x-2">
      <icon
        class="text-yellow-400 flex items-center"
        v-if="props.note.isFavorite"
      >
        <favorite-icon />
      </icon>
      <h2 class="font-bold text-lg text-gray-900 mt-2 mb-1">
        {{ props.note.title }}
      </h2>
    </div>
    <div class="text-gray-700 leading-loose">
      {{ truncate(props.note.content, { length: 300 }) }}
    </div>
  </router-link>
</template>
