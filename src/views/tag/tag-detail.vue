<script setup>
import { reactive } from 'vue';
import { LayoutApp } from '@/layouts';
import { BaseButton } from '@/components/base';
import { Icon } from '@vicons/utils';
import {
  Edit as EditIcon,
  TrashCan as TrashIcon,
  ArrowLeft as BackIcon,
} from '@vicons/carbon';
import { HeaderMenu } from '@/components/layouts/headers';
import { TagEditModal } from '@/components/tag';
import { NoteItem } from '@/components/note';
import { useRouter } from 'vue-router';

const router = useRouter();

const tagEditModalState = reactive({
  visible: false,
});

const notes = [
  {
    id: 1,
    tag: {
      color: 'primary',
      name: 'Diary',
    },
    isFavorite: false,
    createdAt: null,
    title: 'Tailwind CSS Badges - Flowbite',
    content:
      'The badge component can be used to complement other elements such as buttons or text elements as a label or to show the count of a given data, such as the number of comments for an article or how much time has passed by since a comment has been made.',
  },
  {
    id: 2,
    tag: null,
    isFavorite: true,
    createdAt: new Date(),
    title: 'Feature preview',
    content:
      'Quickly navigate and jump between your organizations or repositories and search recent issues, pull requests, projects and more with the new command palette. You can also execute time saving commands all without lifting your fingers off the keyboard!',
  },
  {
    id: 3,
    tag: {
      color: 'danger',
      name: 'Logs',
    },
    isFavorite: false,
    createdAt: new Date(),
    title: 'Reactivity for Arrays & Objects in Vue vs. Svelte',
    content:
      'Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.',
  },
];

const handleCreateNote = () => {
  router.push({ name: 'NoteCreate' });
};

const handleEdit = () => {
  tagEditModalState.visible = true;
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        create-label="New Note"
        v-on:create="handleCreateNote"
      />
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link :to="{ name: 'Tag' }" custom v-slot="{ navigate }">
            <button class="flex items-center mt-1" v-on:click="navigate">
              <icon size="20">
                <back-icon />
              </icon>
            </button>
          </router-link>
          <h1 class="font-bold text-3xl text-gray-900">Tags: General</h1>
        </div>
        <div class="flex space-x-2">
          <base-button
            color="primary"
            class="flex items-center"
            v-on:click="handleEdit"
          >
            <icon size="16">
              <edit-icon />
            </icon>
          </base-button>
          <base-button color="danger" class="flex items-center">
            <icon size="16">
              <trash-icon />
            </icon>
          </base-button>
        </div>
      </div>
    </div>
    <div>
      <note-item v-for="note in notes" :key="note.id" :note="note" />
    </div>
    <tag-edit-modal
      v-model:visible="tagEditModalState.visible"
      :tag="{
        id: 1,
        name: 'General',
        color: 'primary',
        notesCount: 16,
      }"
    />
  </layout-app>
</template>
