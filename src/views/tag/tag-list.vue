<script setup>
import { reactive } from 'vue';
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
import { BaseButton } from '@/components/base';
import { TagCreateModal } from '@/components/tag';
import { useRouter } from 'vue-router';

const router = useRouter();

const tagCreateModalState = reactive({
  visible: false,
});

const colors = ['primary', 'danger', 'warning', 'success', 'info'];
const tags = [
  'General',
  'Diary',
  'Story',
  'Love',
  'Programming',
  'Crush',
  'Friends',
  'Job',
  'Tasks',
  'Religion',
  'Music',
].map((tag, index) => ({
  id: index + 1,
  name: tag,
  color: colors[Math.floor(Math.random() * colors.length)],
  notesCount: Math.floor(Math.random() * 20) + 1,
}));

const handleCreate = () => {
  tagCreateModalState.visible = true;
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        search-placeholder="Search Tags"
        create-label="New Tag"
        v-on:create="handleCreate"
      />
      <h1 class="font-bold text-3xl text-gray-900">Tags</h1>
    </div>
    <div class="p-5 flex flex-wrap gap-2">
      <div v-for="tag in tags" :key="tag.id">
        <base-button
          :label="tag.name"
          :badge="tag.notesCount"
          :color="tag.color"
        />
      </div>
    </div>
    <tag-create-modal v-model:visible="tagCreateModalState.visible" />
  </layout-app>
</template>
